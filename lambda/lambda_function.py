import json
import boto3
import uuid

# AWS Clients
s3 = boto3.client('s3')
rekognition = boto3.client('rekognition')
polly = boto3.client('polly')

# DynamoDB
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('AccidentRecords')

# S3 Bucket
BUCKET = "accident-monitor-system"


def lambda_handler(event, context):

    print("Received Event:", json.dumps(event))

    try:

        # Support both Lambda Test and API Gateway
        if 'body' in event:
            body = json.loads(event['body'])
        else:
            body = event

        location = body.get('location', 'Unknown')

        # Image already uploaded in S3
        image_name = "images/test1.jpg"

        print("Processing Image:", image_name)

        # Rekognition Analysis
        labels = rekognition.detect_labels(
            Image={
                'S3Object': {
                    'Bucket': BUCKET,
                    'Name': image_name
                }
            },
            MaxLabels=10
        )

        confidence = 0

        for label in labels['Labels']:
            confidence = max(
                confidence,
                int(label['Confidence'])
            )

        accident_id = str(uuid.uuid4())

        status = "Critical" if confidence > 80 else "Normal"

        print("Confidence:", confidence)

        # Save to DynamoDB
        table.put_item(
            Item={
                'accident_id': accident_id,
                'location': location,
                'confidence': confidence,
                'image': image_name,
                'status': status
            }
        )

        print("Saved to DynamoDB")

        # Generate Voice Alert using Polly
        speech = polly.synthesize_speech(
            Text=f'Possible accident detected at {location}',
            OutputFormat='mp3',
            VoiceId='Joanna'
        )

        audio_key = f'audio/{accident_id}.mp3'

        # Save MP3 to S3
        s3.put_object(
            Bucket=BUCKET,
            Key=audio_key,
            Body=speech['AudioStream'].read()
        )

        print("Audio Saved:", audio_key)

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Accident processed successfully',
                'accident_id': accident_id,
                'location': location,
                'confidence': confidence,
                'status': status,
                'audio_file': audio_key
            })
        }

    except Exception as e:

        print("ERROR:", str(e))

        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': str(e)
            })
        }
