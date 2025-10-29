const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const path = require('path');
const { setupWSConnection } = require('y-websocket/bin/utils');

const app = express();
const server = http.createServer(app);

app.use(express.static('client/dist'));

const wss = new WebSocket.Server({ server });
wss.on('connection', setupWSConnection);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket relay at ws://localhost:${PORT}`);
  console.log(`Public URL: https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
});
