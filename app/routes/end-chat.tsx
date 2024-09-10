// app/routes/end-chat.tsx
import { ActionFunction, redirect } from "@remix-run/node";
import { getSession, destroySession } from "~/utils/session.server";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request);
  return redirect("/role", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
