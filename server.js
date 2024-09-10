// // // server.js
// // import WebSocket from "ws";

// // const wss = new WebSocket.Server({ port: 8080 });

// // wss.on("connection", (ws) => {
// //   console.log("New client connected");

// //   ws.on("message", (message) => {
// //     const data = JSON.parse(message);

// //     // Broadcast to all clients connected to the WebSocket server
// //     wss.clients.forEach((client) => {
// //       if (client.readyState === WebSocket.OPEN) {
// //         client.send(JSON.stringify(data));
// //       }
// //     });
// //   });

// //   ws.on("close", () => {
// //     console.log("Client disconnected");
// //   });

// //   // Send a welcome message
// //   ws.send(JSON.stringify({ content: "Welcome to the chat!" }));
// // });


// import express from 'express';
// import { createRequestHandler } from '@remix-run/express';
// import WebSocket, { WebSocketServer } from 'ws';
// import { createWebSocketServer } from './websocketServer.ts'; 

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Start the HTTP server (same server for Remix and WebSockets)
// const server = app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Create the WebSocket server
// const wss = new WebSocketServer({ server });
// createWebSocketServer(wss); // Setup WebSocket logic

// // Handle all Remix requests
// app.all(
//   '*',
//   createRequestHandler({
//     getLoadContext() {
//       return {}; // Optionally provide context
//     },
//   })
// );



import express from 'express';
import { createRequestHandler } from '@remix-run/express';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWebSocketServer } from './websocketServer';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the Remix build output
const remixBuild = require(path.join(__dirname, 'build')); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Start the HTTP server and pass it to the WebSocket server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ server });

// WebSocket server logic
wss.on('connection', (ws) => {
  console.log('New WebSocket connection established');

  // Handle messages from clients
  ws.on('message', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message); // Send message to all clients
      }
    });
  });

  // Handle WebSocket close event
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });

  // Send a welcome message when a new client connects
  ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));
});

// Handle all Remix routes
app.all(
  '*',
  createRequestHandler({
    build: remixBuild,  // Pass the Remix build output here
    getLoadContext() {
      // Optionally provide context here
      return {};
    },
  })
);
