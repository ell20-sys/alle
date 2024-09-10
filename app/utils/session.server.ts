import { createCookieSessionStorage } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET || "defaultsecret";
const storage = createCookieSessionStorage({
  cookie: {
    name: "session",
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export function getSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function commitSession(session: any) {
  return storage.commitSession(session);
}

export async function destroySession(session: any) {
  return storage.destroySession(session);
}
