// // app/utils/matchmaking.server.ts
// import { json } from "@remix-run/node";
// import { createSession, findMatchingSession } from "partykit";
// import createSess

// export async function handleMatchmaking(role: "seeker" | "helper") {
//   let matchingSession = await findMatchingSession(role);

//   if (matchingSession) {
//     return json({ sessionId: matchingSession.id });
//   }

//   let newSession = await createSession(role);
//   return json({ sessionId: newSession.id });
// }
