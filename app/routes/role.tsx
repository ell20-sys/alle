// app/routes/role.tsx
import { ActionFunction, redirect } from "@remix-run/node";
import { connectToDB } from "~/utils/db.server";
import { User } from "~/models/user.server";
import { Session } from "~/models/session.server";
import { getSession, commitSession } from "~/utils/session.server";
import { Form,Link } from "@remix-run/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { HelpCircle, HandHeart, ArrowLeft } from "lucide-react";

export const action: ActionFunction = async ({ request }) => {
  await connectToDB();
  const session = await getSession(request);
  const formData = await request.formData();
  const role = formData.get("role") as "seeker" | "helper";

  const nickname = `User${Math.floor(Math.random() * 10000)}`;

  let match;
  if (role === "seeker") {
    match = await User.findOne({ role: "helper", sessionId: null });
  } else {
    match = await User.findOne({ role: "seeker", sessionId: null });
  }

  let sessionId;
  if (match) {
    const newSession = await Session.create({
      [role]: match._id,
      [match.role]: match._id,
    });
    sessionId = newSession._id;

    match.sessionId = newSession._id;
    await match.save();

    const newUser = await User.create({
      nickname,
      role,
      sessionId: newSession._id,
    });
    session.set("userId", newUser._id);
    session.set("sessionId", sessionId);
  } else {
    const newUser = await User.create({ nickname, role });
    session.set("userId", newUser._id);
  }

  return redirect(`/chat/${sessionId}`, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
};

export default function RolePage() {
  return (
    <div className="flex items-center min-h-screen">
      <Card className="w-full max-w-md mx-auto">
        <Link to="/" className="p-4 flex gap-2 hover:text-gray-500">
            <ArrowLeft/><span>Go Back</span>
        </Link>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            How can i assist you today?
          </CardTitle>
          <CardDescription className="text-center">
            Choose an option below
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Form method="post" className="w-full">
            <Button
              variant="outline"
              type="submit"
              name="role" 
              value="seeker"
              className="flex items-center justify-center space-x-2 h-16 w-full bg-blue-500"
              onClick={() => console.log("Seek help clicked")}
            >
              <HelpCircle className="w-6 h-6" />
              <span className="text-lg">I need help</span>
            </Button>
            <Button
              variant="outline"
              type="submit"
             name="role" 
             value="helper"
              className="flex items-center justify-center space-x-2 h-16 w-full bg-green-500"
                onClick={() => console.log("Offer help clicked")}
            >
              <HandHeart className="w-6 h-6" />
              <span className="text-lg">I want to help others</span>
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
