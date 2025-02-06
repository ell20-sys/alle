// import { WebSocketServer, WebSocket } from "ws";

// // In-memory store for WebSocket sessions
// const sessions: Map<string, Set<WebSocket>> = new Map();

// /**
//  * Handle WebSocket upgrade and connection
//  */
// export function handleWebSocketUpgrade(request: any, socket: any, head: any) {
//   const wss = new WebSocketServer({ noServer: true });

//   wss.on("connection", (ws, request) => {
//     const urlParams = new URLSearchParams(request.url?.split("?")[1]);
//     const sessionId = urlParams.get("sessionId");

//     if (!sessionId) {
//       ws.send(JSON.stringify({ error: "Session ID is required" }));
//       ws.close();
//       return;
//     }

//     // Add WebSocket to the session set
//     if (!sessions.has(sessionId)) {
//       sessions.set(sessionId, new Set());
//     }
//     sessions.get(sessionId)?.add(ws);

//     // Handle message broadcasting
//     ws.on("message", (data) => {
//       const message = JSON.parse(data.toString());
//       broadcastMessageToSession(sessionId, JSON.stringify(message));
//     });

//     // Handle WebSocket close
//     ws.on("close", () => {
//       const sessionClients = sessions.get(sessionId);
//       if (sessionClients) {
//         sessionClients.delete(ws);
//         if (sessionClients.size === 0) {
//           sessions.delete(sessionId);
//         }
//       }
//     });
//   });

//   wss.handleUpgrade(request, socket, head, (ws) => {
//     wss.emit("connection", ws, request);
//   });
// }

// /**
//  * Broadcast a message to all WebSocket clients in a session
//  * @param sessionId - The session ID
//  * @param message - The message to broadcast
//  */
// function broadcastMessageToSession(sessionId: string, message: string) {
//   const clients = sessions.get(sessionId);
//   if (clients) {
//     for (const client of clients) {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     }
//   }
// }

import { WebSocketServer, WebSocket } from 'ws';

// In-memory store for WebSocket sessions
const sessions: Map<string, Set<WebSocket>> = new Map();

/**
 * Handle WebSocket upgrade and connection
 */
export function handleWebSocketUpgrade(request: any, socket: any, head: any) {
  const wss = new WebSocketServer({ noServer: true });

  wss.on('connection', (ws, request) => {
    const urlParams = new URLSearchParams(request.url?.split('?')[1]);
    const sessionId = urlParams.get('sessionId');

    if (!sessionId) {
      ws.send(JSON.stringify({ error: 'Session ID is required' }));
      ws.close();
      return;
    }

    // Add WebSocket to the session set
    if (!sessions.has(sessionId)) {
      sessions.set(sessionId, new Set());
    }
    sessions.get(sessionId)?.add(ws);

    // Handle message broadcasting
    ws.on('message', (data) => {
      const message = JSON.parse(data.toString());
      broadcastMessageToSession(sessionId, JSON.stringify(message));
    });

    // Handle WebSocket close
    ws.on('close', () => {
      const sessionClients = sessions.get(sessionId);
      if (sessionClients) {
        sessionClients.delete(ws);
        if (sessionClients.size === 0) {
          sessions.delete(sessionId);
        }
      }
    });
  });

  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
}

/**
 * Broadcast a message to all WebSocket clients in a session
 * @param sessionId - The session ID
 * @param message - The message to broadcast
 */
function broadcastMessageToSession(sessionId: string, message: string) {
  const clients = sessions.get(sessionId);
  if (clients) {
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }
}
