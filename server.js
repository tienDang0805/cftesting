const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

// Middleware để log thông tin request
app.use((req, res, next) => {
    const logData = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        headers: req.headers,
        body: req.body,
    };

    const logString = `[${logData.timestamp}] ${logData.method} ${logData.url} - IP: ${logData.ip}\nHeaders: ${JSON.stringify(logData.headers, null, 2)}\nBody: ${JSON.stringify(logData.body, null, 2)}\n\n`;

    // In ra console
    console.log(logString);

    // Ghi vào file log

    next(); // Tiếp tục xử lý request
});

// Utility function to calculate MD5 signature
function generateSignature(data, apiKey) {
    const sortedKeys = Object.keys(data).sort();
    const stringToSign = sortedKeys
        .map((key) => `${key}=${data[key]}`)
        .join('&') + apiKey;
    return crypto.createHash('md5').update(stringToSign).digest('hex');
}

// Simulate API Key
const apiKey = 'DBRW17YE7FHKR72T';

// Endpoints
app.post('/getQrCode', (req, res) => {
    const { username, time, sign, data } = req.body;

    // const calculatedSign = generateSignature({ ...data, username, time }, apiKey);
    // if (calculatedSign !== sign) {
    //     console.error('Invalid signature:', { calculatedSign, receivedSign: sign });
    //     return res.status(400).json({ returnCode: 'SIGN_ERROR', msg: 'Invalid signature' });
    // }

    res.json({
        returnCode: 'SUCCESS',
        msg: 'QR code generated',
        time: new Date().toISOString(),
        data: {
            deviceNo: data.deviceNo,
            orderNo: data.orderNo,
            qrCode: 'https://example.com/qr-code'
        }
    });
});

app.post('/payBarCode', (req, res) => {
    const { username, time, sign, data } = req.body;

    // const calculatedSign = generateSignature({ ...data, username, time }, apiKey);
    // if (calculatedSign !== sign) {
    //     console.error('Invalid signature:', { calculatedSign, receivedSign: sign });
    //     return res.status(400).json({ returnCode: 'SIGN_ERROR', msg: 'Invalid signature' });
    // }

    const payStatus = 'PAYSUCCESS'; // Could be dynamic
    res.json({
        returnCode: 'SUCCESS',
        msg: 'Payment processed',
        time: new Date().toISOString(),
        data: {
            deviceNo: data.deviceNo,
            orderNo: data.orderNo,
            payStatus
        }
    });
});

app.post('/callback', (req, res) => {
    const { username, time, sign, data } = req.body;

    // const calculatedSign = generateSignature({ ...data, username, time }, apiKey);
    // if (calculatedSign !== sign) {
    //     console.error('Invalid signature:', { calculatedSign, receivedSign: sign });
    //     return res.status(400).json({ returnCode: 'SIGN_ERROR', msg: 'Invalid signature' });
    // }

    res.json({ returnCode: 'SUCCESS', msg: 'Callback received' });
});

app.post('/refund', (req, res) => {
    const { username, time, sign, data } = req.body;

    // const calculatedSign = generateSignature({ ...data, username, time }, apiKey);
    // if (calculatedSign !== sign) {
    //     console.error('Invalid signature:', { calculatedSign, receivedSign: sign });
    //     return res.status(400).json({ returnCode: 'SIGN_ERROR', msg: 'Invalid signature' });
    // }

    res.json({
        returnCode: 'SUCCESS',
        msg: 'Refund processed',
        time: new Date().toISOString(),
        data: {
            deviceNo: data.deviceNo,
            orderNo: data.orderNo,
            refundState: 'SUCCESS'
        }
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
