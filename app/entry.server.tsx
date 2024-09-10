// /**
//  * By default, Remix will handle generating the HTTP Response for you.
//  * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
//  * For more information, see https://remix.run/file-conventions/entry.server
//  */

// import { PassThrough } from "node:stream";

// import type { AppLoadContext, EntryContext } from "@remix-run/node";
// import { createReadableStreamFromReadable } from "@remix-run/node";
// import { RemixServer } from "@remix-run/react";
// import { isbot } from "isbot";
// import { renderToPipeableStream } from "react-dom/server";

// const ABORT_DELAY = 5_000;

// export default function handleRequest(
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext,
//   // This is ignored so we can keep it in the template for visibility.  Feel
//   // free to delete this parameter in your app if you're not using it!
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   loadContext: AppLoadContext
// ) {
//   return isbot(request.headers.get("user-agent") || "")
//     ? handleBotRequest(
//         request,
//         responseStatusCode,
//         responseHeaders,
//         remixContext
//       )
//     : handleBrowserRequest(
//         request,
//         responseStatusCode,
//         responseHeaders,
//         remixContext
//       );
// }

// function handleBotRequest(
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext
// ) {
//   return new Promise((resolve, reject) => {
//     let shellRendered = false;
//     const { pipe, abort } = renderToPipeableStream(
//       <RemixServer
//         context={remixContext}
//         url={request.url}
//         abortDelay={ABORT_DELAY}
//       />,
//       {
//         onAllReady() {
//           shellRendered = true;
//           const body = new PassThrough();
//           const stream = createReadableStreamFromReadable(body);

//           responseHeaders.set("Content-Type", "text/html");

//           resolve(
//             new Response(stream, {
//               headers: responseHeaders,
//               status: responseStatusCode,
//             })
//           );

//           pipe(body);
//         },
//         onShellError(error: unknown) {
//           reject(error);
//         },
//         onError(error: unknown) {
//           responseStatusCode = 500;
//           // Log streaming rendering errors from inside the shell.  Don't log
//           // errors encountered during initial shell rendering since they'll
//           // reject and get logged in handleDocumentRequest.
//           if (shellRendered) {
//             console.error(error);
//           }
//         },
//       }
//     );

//     setTimeout(abort, ABORT_DELAY);
//   });
// }

// function handleBrowserRequest(
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext
// ) {
//   return new Promise((resolve, reject) => {
//     let shellRendered = false;
//     const { pipe, abort } = renderToPipeableStream(
//       <RemixServer
//         context={remixContext}
//         url={request.url}
//         abortDelay={ABORT_DELAY}
//       />,
//       {
//         onShellReady() {
//           shellRendered = true;
//           const body = new PassThrough();
//           const stream = createReadableStreamFromReadable(body);

//           responseHeaders.set("Content-Type", "text/html");

//           resolve(
//             new Response(stream, {
//               headers: responseHeaders,
//               status: responseStatusCode,
//             })
//           );

//           pipe(body);
//         },
//         onShellError(error: unknown) {
//           reject(error);
//         },
//         onError(error: unknown) {
//           responseStatusCode = 500;
//           // Log streaming rendering errors from inside the shell.  Don't log
//           // errors encountered during initial shell rendering since they'll
//           // reject and get logged in handleDocumentRequest.
//           if (shellRendered) {
//             console.error(error);
//           }
//         },
//       }
//     );

//     setTimeout(abort, ABORT_DELAY);
//   });
// }


import { PassThrough } from "node:stream";
import { createServer } from "http";
import { WebSocketServer } from "ws"; // Import WebSocket library

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";

// WebSocket Server setup
const server = createServer();
const wss = new WebSocketServer({ server }); // WebSocketServer bound to the same server

// WebSocket server logic
wss.on("connection", (ws) => {
  console.log("New WebSocket connection established");

  ws.on("message", (message) => {
    console.log("Received message:", message);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message); // Send message to all clients
      }
    });
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });

  // Send a welcome message when a client connects
  ws.send(JSON.stringify({ message: "Welcome to the WebSocket server!" }));
});

const ABORT_DELAY = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  return isbot(request.headers.get("user-agent") || "")
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      );
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

// Start the server, handling both Remix requests and WebSocket connections
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
