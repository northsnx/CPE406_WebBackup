const WebSocket = require('ws');
const express = require('express');
const app = express();
const port = 3000;

// สร้าง WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });

// รับข้อมูลจาก Wokwi
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message);

    // ส่งข้อมูลไปยังหน้าเว็บไซต์
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// เสิร์ฟหน้าเว็บไซต์
app.use(express.static('frontend')); // ใส่ไฟล์ HTML/JS ในโฟลเดอร์ public
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
