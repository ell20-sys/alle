// websocketServer.ts
import WebSocket, { WebSocketServer } from 'ws';

export function createWebSocketServer(wss: WebSocketServer) {
  wss.on('connection', (ws: WebSocket) => {
    console.log('New WebSocket connection established');

    ws.on('message', (message: string) => {
      console.log('Received message:', message);

      // Broadcast message to all connected clients
      wss.clients.forEach((client: { readyState: any; send: (arg0: string) => void; }) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });

    // Send a welcome message when a client connects
    ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));
  });
}
