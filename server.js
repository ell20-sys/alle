// // server.js
// import WebSocket from "ws";

// const wss = new WebSocket.Server({ port: 8080 });

// wss.on("connection", (ws) => {
//   console.log("New client connected");

//   ws.on("message", (message) => {
//     const data = JSON.parse(message);

//     // Broadcast to all clients connected to the WebSocket server
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify(data));
//       }
//     });
//   });

//   ws.on("close", () => {
//     console.log("Client disconnected");
//   });

//   // Send a welcome message
//   ws.send(JSON.stringify({ content: "Welcome to the chat!" }));
// });


import express from 'express';
import { createRequestHandler } from '@remix-run/express';
import WebSocket, { WebSocketServer } from 'ws';
import { createWebSocketServer } from './websocketServer.ts'; 

const app = express();
const PORT = process.env.PORT || 3000;

// Start the HTTP server (same server for Remix and WebSockets)
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Create the WebSocket server
const wss = new WebSocketServer({ server });
createWebSocketServer(wss); // Setup WebSocket logic

// Handle all Remix requests
app.all(
  '*',
  createRequestHandler({
    getLoadContext() {
      return {}; // Optionally provide context
    },
  })
);
