const WebSocket = require('ws');
const http = require('http');
const { setupWSConnection } = require('y-websocket/bin/utils');

const host = '0.0.0.0';
const port = 1234;

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Yjs WebSocket relay server');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', setupWSConnection);

server.listen(port, host, () => {
  console.log(`y-websocket relay running at ws://${host}:${port}`);
});

