const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware để xử lý JSON request body
app.use(bodyParser.json());

// Helper functions
function formatDate() {
    const now = new Date();
    return now.toISOString().replace('T', ' ').split('.')[0];
}

// Command Handlers
function handleLogin(req, res) {
    const request = req.body;
    const response = {
        cmd: `${request.cmd}_r`,
        vmc_no: request.vmc_no,
        carrier_code: "TW-00418",
        date_time: formatDate(),
        server_list: "185.100.67.252",
        ret: 0,
    };

    console.log(`Response sent: ${JSON.stringify(response)}`);
    res.json(response);
}

function handlePayment(req, res) {
    const request = req.body;
    const response = {
        cmd: `${request.cmd}_r`,
        vmc_no: request.vmc_no,
        qr_type: request.qr_type,
        qrcode: "XXXXXXXXXXXXXX", // Đây là mã QR giả
        order_no: request.order_no,
    };

    console.log(`Response sent: ${JSON.stringify(response)}`);
    res.json(response);
}

// Error Response
function sendErrorResponse(res, errorMsg) {
    const response = { error: errorMsg };
    console.log(`Error response sent: ${JSON.stringify(response)}`);
    res.status(400).json(response);
}

// Xử lý các yêu cầu POST
app.post('/', (req, res) => {
    const request = req.body;

    if (!request.cmd) {
        sendErrorResponse(res, "Invalid request format");
        return;
    }

    console.log(`Request command: ${request.cmd}`);

    switch (request.cmd) {
        case "login":
            handleLogin(req, res);
            break;
        case "qrcode":
            handlePayment(req, res);
            break;
        default:
            console.log("Unknown command received.");
            sendErrorResponse(res, "Unknown command");
    }
});

// Start the HTTP server
app.listen(port, () => {
    console.log(`Server running and listening on http://localhost:${port}`);
});
