const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// API Gateway URL
const API_URL =
'https://373m6ianme.execute-api.ap-south-1.amazonaws.com/accident';

// Health Check
app.get('/', (req, res) => {
    res.send('Accident Detection Backend Running');
});

// Accident API
app.post('/report-accident', async (req, res) => {

    try {

        console.log("Received Request:", req.body);

        const response = await axios.post(
            API_URL,
            req.body,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("Lambda Response:", response.data);

        res.status(200).json(response.data);

    } catch (error) {

        console.log("=========== ERROR ===========");

        if (error.response) {

            console.log("Status:", error.response.status);
            console.log("Data:", error.response.data);

            res.status(error.response.status).json({
                message: "API Gateway Error",
                status: error.response.status,
                details: error.response.data
            });

        } else {

            console.log(error.message);

            res.status(500).json({
                message: "Backend Error",
                error: error.message
            });

        }

    }

});

// Start Server
app.listen(5000, '0.0.0.0', () => {
    console.log('Backend Running On Port 5000');
});
