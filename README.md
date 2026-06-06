# AI Accident Detection System Using AWS - Detailed Explanation

## Introduction

I built an AI-based Accident Detection System using AWS cloud services to understand how multiple AWS services can be integrated into a real-world application.

The purpose of this project is to analyze accident-related images, store incident information, generate voice alerts, and display the results through a web application.

This project follows a multi-tier architecture consisting of:

1. Frontend Layer
2. Backend Layer
3. AWS Cloud Services Layer

---

# Architecture

User
↓
React Frontend (EC2)

↓
Node.js Backend (EC2)

↓
API Gateway

↓
Lambda

↓
S3 + Rekognition

↓
DynamoDB + Polly

↓
Response to User


---

# Services Used

## 1. Amazon EC2

I used Amazon EC2 to host:

* React Frontend
* Node.js Backend

The frontend provides the user interface.

The backend acts as a middleware between the frontend and AWS services.

---

## 2. Amazon API Gateway

API Gateway acts as the entry point to AWS.

Whenever the backend sends a request, API Gateway receives it and invokes the Lambda function.

Benefits:

* Secure API exposure
* Scalability
* Easy integration with Lambda

---

## 3. AWS Lambda

Lambda is the core processing component.

Responsibilities:

* Receive request from API Gateway
* Read image from S3
* Invoke Rekognition
* Store records in DynamoDB
* Generate audio using Polly
* Return response

Since Lambda is serverless, there is no need to manage servers.

---

## 4. Amazon S3

I used Amazon S3 for storage.

### Images Folder

Stores accident images.

Example:

images/test1.jpg

### Audio Folder

Stores generated MP3 files from Polly.

Example:

audio/76716655-b9da.mp3

Benefits:

* Highly durable storage
* Easy integration with AWS services

---

## 5. Amazon Rekognition

Rekognition performs image analysis.

The image stored in S3 is sent to Rekognition.

Rekognition detects labels such as:

* Vehicle
* Car
* Road
* Transportation

and provides confidence scores.

Example:

Confidence = 99%

This confidence value is used to determine accident severity.

---

## 6. Amazon DynamoDB

DynamoDB stores accident records.

Sample Record:

Accident ID
Location
Confidence
Status
Image Name

Example:

Location: Pune Highway
Confidence: 99
Status: Critical

Benefits:

* NoSQL database
* Fully managed
* Highly scalable

---

## 7. Amazon Polly

Polly converts text into speech.

Example Message:

"Possible accident detected at Pune Highway"

Polly generates an MP3 file.

The generated audio file is stored in S3.

---

# Project Workflow

## Step 1

User opens the React application hosted on EC2.

---

## Step 2

User enters:

Pune Highway

and clicks:

Report Accident

---

## Step 3

React frontend sends request to Node.js backend.

Example:

{
"location": "Pune Highway"
}

---

## Step 4

Backend forwards request to API Gateway.

---

## Step 5

API Gateway invokes Lambda.

---

## Step 6

Lambda reads image:

images/test1.jpg

from S3.

---

## Step 7

Lambda calls Rekognition.

Rekognition analyzes the image and returns labels and confidence scores.

---

## Step 8

Lambda determines status.

Logic:

If confidence > 80

Status = Critical

Else

Status = Normal

---

## Step 9

Lambda stores record in DynamoDB.

---

## Step 10

Lambda calls Polly.

Polly generates voice alert.

---

## Step 11

Generated MP3 is stored in S3.

---

## Step 12

Lambda returns response.

Example:

{
"message": "Accident processed successfully",
"location": "Pune Highway",
"confidence": 99,
"status": "Critical"
}

---

## Challenges Faced

During implementation I encountered:

* API Gateway integration issues
* Lambda event formatting issues
* SNS topic deletion issue
* Rekognition image format errors
* EC2 deployment and security group configuration

I resolved these issues by debugging logs and updating service configurations.

---

## Learning Outcomes

Through this project I learned:

* AWS Lambda
* API Gateway
* EC2 deployment
* Amazon Rekognition
* Amazon DynamoDB
* Amazon Polly
* Amazon S3
* Full project deployment on AWS
* Multi-tier architecture concepts

---

## Future Enhancements

1. Upload image directly from frontend
2. Email notifications using SNS
3. SMS alerts
4. Real-time dashboard
5. Machine learning based accident severity prediction
6. Mobile application integration

---

# Conclusion

This project helped me gain practical experience with AWS cloud services by building a complete end-to-end application. It demonstrates cloud architecture, serverless computing, image analysis, 
data storage, and web application deployment using AWS.


This project was developed by Vaibhav Thete as part of hands-on learning and practice with AWS Cloud Services.

The project demonstrates the integration of multiple AWS services including Amazon EC2, AWS Lambda, Amazon API Gateway, Amazon S3, Amazon Rekognition, Amazon DynamoDB, and Amazon Polly to build a real-world cloud-based application.

Special thanks to the AWS documentation, AWS Free Tier resources, and the cloud learning community for providing guidance and learning materials throughout the development process.

Author

Vaibhav Thete

GitHub: https://github.com/Vaibhavthete12

Project Purpose

This project was created for:

AWS Cloud Learning
Hands-on Practice
Portfolio Demonstration
Interview Preparation
Understanding Multi-Tier Cloud Architecture





⭐ If you found this project useful, please consider giving it a star on GitHub.
