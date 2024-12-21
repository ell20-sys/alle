// const WebSocket = require('ws');
// const { Session } = require('./app/models/session.server'); // Import your session model

// const wss = new WebSocket.Server({ port: 8080 });

// let waitingSeeker = null;
// let waitingHelper = null;

// wss.on('connection', async (ws, req) => {
    //   // Assuming req.url includes /role/helper or /role/seeker
    //   const role = req.url.includes('helper') ? 'helper' : 'seeker';
    //   let session;
    
    //   // Handle role matching
    //   if (role === 'seeker') {
        //     if (waitingHelper) {
            //       // If helper is available, pair them
            //       const helper = waitingHelper;
            //       waitingHelper = null;
            //       session = await createSession(ws.userId, helper.userId);  // Create session in your DB
            
            //       ws.send(JSON.stringify({ message: 'Matched with a helper' }));
            //       helper.send(JSON.stringify({ message: 'Matched with a seeker' }));
            
            //       // Now setup a communication room between seeker and helper
            //       setupRoom([ws, helper]);
            //     } else {
                //       waitingSeeker = ws;
                //       ws.send(JSON.stringify({ message: 'Waiting for a helper' }));
                //     }
                //   } else if (role === 'helper') {
                    //     if (waitingSeeker) {
                        //       const seeker = waitingSeeker;
                        //       waitingSeeker = null;
                        //       session = await createSession(ws.userId, seeker.userId);  // Create session in your DB
                        
                        //       ws.send(JSON.stringify({ message: 'Matched with a seeker' }));
                        //       seeker.send(JSON.stringify({ message: 'Matched with a helper' }));
                        
                        //       // Now setup a communication room between seeker and helper
                        //       setupRoom([ws, seeker]);
                        //     } else {
                            //       waitingHelper = ws;
                            //       ws.send(JSON.stringify({ message: 'Waiting for a seeker' }));
                            //     }
                            //   }
                            
                            //   // If the session ends, clean up
                            //   ws.on('close', async () => {
                                //     // Mark session as inactive in your DB
                                //     await endSession(session._id);
                                //   });
                                // });
                                
                                // async function createSession(seekerId, helperId) {
                                    //   // Assuming you have a function to create a session
                                    //   return Session.create({ seeker: seekerId, helper: helperId });
                                    // }
                                    
                                    // async function endSession(sessionId) {
                                        //   // Mark the session as inactive
                                        //   await Session.findByIdAndUpdate(sessionId, { active: false });
                                        // }
                                        
                                        // function setupRoom(clients) {
                                            //   clients.forEach(client => {
                                                //     client.on('message', (message) => {
                                                    //       // Relay messages between the clients
                                                    //       clients.forEach(c => {
                                                        //         if (c !== client && c.readyState === WebSocket.OPEN) {
                                                            //           c.send(message);
                                                            //         }
                                                            //       });
                                                            //     });
                                                            
                                                            //     client.on('close', () => {
                                                                //       // Close the room when a client disconnects
                                                                //       clients.forEach(c => {
                                                                    //         if (c !== client && c.readyState === WebSocket.OPEN) {
                                                                        //           c.close();
                                                                        //         }
                                                                        //       });
                                                                        //     });
                                                                        //   });
                                                                        // }
const WebSocket = require('ws');
const { Session } = require('./app/models/session.server'); // Import your session model

const wss = new WebSocket.Server({ port: 8080 });

let waitingSeeker = null;
let waitingHelper = null;

wss.on('connection', async (ws, req) => {
  const role = req.url.includes('helper') ? 'helper' : 'seeker';
  let session;

  ws.isAlive = true; // Track the connection state

  ws.on('pong', () => {
    ws.isAlive = true; // WebSocket "heartbeat" mechanism to ensure it's alive
  });

  // Handle role matching
  if (role === 'seeker') {
    if (waitingHelper) {
      const helper = waitingHelper;
      waitingHelper = null;
      session = await createSession(ws.userId, helper.userId);

      ws.send(JSON.stringify({ message: 'Matched with a helper' }));
      helper.send(JSON.stringify({ message: 'Matched with a seeker' }));

      // Now setup a communication room between seeker and helper
      setupRoom([ws, helper]);
    } else {
      waitingSeeker = ws;
      ws.send(JSON.stringify({ message: 'Waiting for a helper' }));
    }
  } else if (role === 'helper') {
    if (waitingSeeker) {
      const seeker = waitingSeeker;
      waitingSeeker = null;
      session = await createSession(ws.userId, seeker.userId);

      ws.send(JSON.stringify({ message: 'Matched with a seeker' }));
      seeker.send(JSON.stringify({ message: 'Matched with a helper' }));

      // Now setup a communication room between seeker and helper
      setupRoom([ws, seeker]);
    } else {
      waitingHelper = ws;
      ws.send(JSON.stringify({ message: 'Waiting for a seeker' }));
    }
  }

  // Heartbeat to ensure the connection stays alive
  setInterval(() => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping(); // Ping the client
  }, 30000); // Every 30 seconds

  // If the session ends, clean up
  ws.on('close', async () => {
    await endSession(session?._id);
  });
});

async function createSession(seekerId, helperId) {
  return Session.create({ seeker: seekerId, helper: helperId });
}

async function endSession(sessionId) {
  await Session.findByIdAndUpdate(sessionId, { active: false });
}

function setupRoom(clients) {
  clients.forEach(client => {
    client.on('message', (message) => {
      clients.forEach(c => {
        if (c !== client && c.readyState === WebSocket.OPEN) {
          c.send(message);
        }
      });
    });

    client.on('close', () => {
      clients.forEach(c => {
        if (c !== client && c.readyState === WebSocket.OPEN) {
          c.close();
        }
      });
    });
  });
}
