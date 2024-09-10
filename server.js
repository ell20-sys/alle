import WebSocket from "ws";
const ws = new WebSocket('ws://localhost:3000');
ws.onopen = () => {
  console.log('Connected to WebSocket');
  ws.send('Hello from the client!');
};
ws.onmessage = (event) => {
  console.log('Received:', event.data);
};
