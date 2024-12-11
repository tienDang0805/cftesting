const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware để parse JSON
app.use(bodyParser.json());

// Middleware để log tất cả request
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);

    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        if (body) {
            console.log(`Body: ${body}`);
        }
        next();
    });
});

// API 3.1: Get QR Code Interface
app.post('/getQrCode', (req, res) => {
    console.log('Request to /getQrCode:', req.body);
    const { username, time, sign, data } = req.body;

    if (!username || !time || !sign || !data) {
        return res.status(400).json({ returnCode: 'FAIL', msg: 'Missing required fields' });
    }

    // Fake response
    res.json({
        returnCode: 'SUCCESS',
        msg: 'QR Code generated',
        time: new Date().toISOString(),
        data: {
            deviceNo: data.deviceNo,
            orderNo: data.orderNo,
            qrCode: 'http://example.com/qrcode/' + data.orderNo,
        },
    });
});

// API 3.2: Scanned Payment Interface
app.post('/payBarCode', (req, res) => {
    console.log('Request to /payBarCode:', req.body);
    const { username, time, sign, data } = req.body;

    if (!username || !time || !sign || !data) {
        return res.status(400).json({ returnCode: 'FAIL', msg: 'Missing required fields' });
    }

    // Fake response
    res.json({
        returnCode: 'SUCCESS',
        msg: 'Payment processed',
        time: new Date().toISOString(),
        data: {
            deviceNo: data.deviceNo,
            orderNo: data.orderNo,
            payStatus: 'PAYSUCCESS',
        },
    });
});

// API 3.3: Payment Callback Interface
app.post('/paymentCallback', (req, res) => {
    console.log('Callback to /paymentCallback:', req.body);
    const { username, time, sign, data } = req.body;

    if (!username || !time || !sign || !data) {
        return res.status(400).json({ returnCode: 'FAIL', msg: 'Missing required fields' });
    }

    // Fake response
    res.json({ returnCode: 'SUCCESS', msg: 'Callback received' });
});

// API 3.4: Order Refund Interface
app.post('/refund', (req, res) => {
    console.log('Request to /refund:', req.body);
    const { username, time, sign, data } = req.body;

    if (!username || !time || !sign || !data) {
        return res.status(400).json({ returnCode: 'FAIL', msg: 'Missing required fields' });
    }

    // Fake response
    res.json({
        returnCode: 'SUCCESS',
        msg: 'Refund processed',
        time: new Date().toISOString(),
        data: {
            deviceNo: data.deviceNo,
            orderNo: data.orderNo,
            refundState: 'SUCCESS',
        },
    });
});

// Lắng nghe trên cổng 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});