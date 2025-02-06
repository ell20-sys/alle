import { useEffect, useState } from "react";
import { HelpCircle, HandHeart, ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { io } from "socket.io-client";
import CryptoJS from "crypto-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Link, json, useLoaderData } from "@remix-run/react";

export function loader() {
  return json({
    socketServerUrl: process.env.SOCKET_SERVER_URL || "http://localhost:5000",
  });
}

// const socket = io("https://fk239twn-5174.uks1.devtunnels.ms:5000");
// const socket = io();
const SECRET_KEY = "super-secret-key";

const generateUsername = () => {
  const adjectives = ["Swift", "Clever", "Brave", "Mysterious", "Lively"];
  const nouns = ["Fox", "Hawk", "Panther", "Sparrow", "Wolf"];
  return (
    adjectives[Math.floor(Math.random() * adjectives.length)] +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
};

export default function Index() {
  // const { socketServerUrl } = useLoaderData<typeof loader>();
  // console.log("SOCKET_SERVER_URL", socketServerUrl);
  const socket = io();
  // const socket = io(socketServerUrl);
  const SECRET_KEY = "super-secret-key";
  const [role, setRole] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [chatJoined, setChatJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username] = useState(generateUsername());

  useEffect(() => {
    // Listen for events from the backend.
    socket.on("waiting", (room) => {
      setRoomId(room);
      setWaiting(true);
      console.log("Waiting for a match in room:", room);
    });

    socket.on("matched", (room) => {
      setRoomId(room);
      setWaiting(false);
      setChatJoined(true);
      console.log("Matched! Joined room:", room);
    });

    socket.on("chatJoined", ({ roomId: room, role: assignedRole }) => {
      setRoomId(room);
      setChatJoined(true);
      console.log("Chat joined in room:", room, assignedRole);
    });

    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("deleteMessage", (messageId) => {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    });

    // Clean up socket events when the component unmounts.
    return () => {
      socket.off("waiting");
      socket.off("matched");
      socket.off("chatJoined");
      socket.off("message");
      socket.off("deleteMessage");
    };
  }, []);

  const decryptMessage = (encryptedText) => {
    try {
      return CryptoJS.AES.decrypt(encryptedText, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    } catch (e) {
      return "Error decrypting message";
    }
  };

  const chooseRole = (chosenRole) => {
    setRole(chosenRole);
    // Emit join event with the chosen role.
    socket.emit("join", chosenRole);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("message", { roomId, message: input, username });
    setInput("");
  };

  return (
    <div className="flex items-center min-h-screen justify-center bg-gray-900 text-white p-4">

      {/* Role Selection */}
      {!role && (
        <Card className="w-full max-w-md mx-auto">
        <Link to="/" className="p-4 flex gap-2 hover:text-gray-500">
            <ArrowLeft/><span>Go Back</span>
        </Link>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            What do you want to do today?
          </CardTitle>
          <CardDescription className="text-center">
            Choose an option below
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <div className="w-full">
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-2 h-16 w-full bg-blue-500"
              onClick={() => chooseRole("seeker")}
            >
              <HelpCircle className="w-6 h-6" />
              <span className="text-lg">I need help</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-2 h-16 w-full bg-green-500"
              onClick={() => chooseRole("helper")}
            >
              <HandHeart className="w-6 h-6" />
              <span className="text-lg">I want to help others</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Chat Area */}
      {role && !chatJoined && (
        <div className="mt-6">
          {waiting ? (
            <p className="text-yellow-300">Waiting for someone to join...</p>
          ) : (
            <p className="text-green-300">Matched! Connecting to chat...</p>
          )}
        </div>
      )}

      {chatJoined && (
        <div className="w-full max-w-lg bg-gray-800 p-4 rounded-lg mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg">Room: {roomId}</h2>
              <p className="text-sm text-gray-400">You are: {username}</p>
              <p className="text-sm text-gray-400">Role: {role}</p>
            </div>
          </div>

          <div className="h-64 overflow-y-auto bg-gray-700 p-2 mt-2 rounded-md">
            {messages.map((msg) => (
              <div key={msg.id} className="p-2 bg-gray-600 my-2 rounded-md">
                <strong className="text-blue-400">{msg.username}:</strong>{" "}
                {decryptMessage(msg.text)}
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <input
              type="text"
              className="flex-grow p-2 bg-gray-800 rounded-md"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage} className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


// import { Form,Link } from "@remix-run/react";
// import { generateUsername } from "~/lib/username-generator";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "~/components/ui/card";
// import { Button } from "~/components/ui/button";
// import { HelpCircle, HandHeart, ArrowLeft } from "lucide-react";
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import CryptoJS from "crypto-js";

// const socket = io("http://localhost:5000");
// const SECRET_KEY = "super-secret-key";

// export default function RolePage() {
//   const [role, setRole] = useState("");
//   const [waiting, setWaiting] = useState(false);
//   const [roomId, setRoomId] = useState("");
//   const [chatJoined, setChatJoined] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [username] = useState(generateUsername());

//   useEffect(() => {
//     // Listen for events from the backend.
//     socket.on("waiting", (room) => {
//       setRoomId(room);
//       setWaiting(true);
//       console.log("Waiting for a match in room:", room);
//     });

//     socket.on("matched", (room) => {
//       setRoomId(room);
//       setWaiting(false);
//       setChatJoined(true);
//       console.log("Matched! Joined room:", room);
//     });

//     socket.on("chatJoined", ({ roomId: room, role: assignedRole }) => {
//       setRoomId(room);
//       setChatJoined(true);
//       console.log("Chat joined in room:", room, assignedRole);
//     });

//     socket.on("message", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     socket.on("deleteMessage", (messageId) => {
//       setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
//     });

//     // Clean up socket events when the component unmounts.
//     return () => {
//       socket.off("waiting");
//       socket.off("matched");
//       socket.off("chatJoined");
//       socket.off("message");
//       socket.off("deleteMessage");
//     };
//   }, []);

//   const decryptMessage = (encryptedText) => {
//     try {
//       return CryptoJS.AES.decrypt(encryptedText, SECRET_KEY).toString(CryptoJS.enc.Utf8);
//     } catch (e) {
//       return "Error decrypting message";
//     }
//   };

//   const chooseRole = (chosenRole) => {
//     setRole(chosenRole);
//     // Emit join event with the chosen role.
//     socket.emit("join", chosenRole);
//   };

//   const sendMessage = () => {
//     if (!input.trim()) return;
//     socket.emit("message", { roomId, message: input, username });
//     setInput("");
//   };
//   return (
//     <div className="flex items-center min-h-screen">
//       {!role && (
      // <Card className="w-full max-w-md mx-auto">
      //   <Link to="/" className="p-4 flex gap-2 hover:text-gray-500">
      //       <ArrowLeft/><span>Go Back</span>
      //   </Link>
      //   <CardHeader>
      //     <CardTitle className="text-2xl font-bold text-center">
      //       What do you want to do today?
      //     </CardTitle>
      //     <CardDescription className="text-center">
      //       Choose an option below
      //     </CardDescription>
      //   </CardHeader>
      //   <CardContent className="flex flex-col space-y-4">
      //     <Form method="post" className="w-full">
      //       <Button
      //         variant="outline"
      //         type="submit"
      //         name="role" 
      //         value="seeker"
      //         className="flex items-center justify-center space-x-2 h-16 w-full bg-blue-500"
      //         onClick={() => chooseRole("seeker")}
      //       >
      //         <HelpCircle className="w-6 h-6" />
      //         <span className="text-lg">I need help</span>
      //       </Button>
      //       <Button
      //         variant="outline"
      //         type="submit"
      //         name="role" 
      //         value="helper"
      //         className="flex items-center justify-center space-x-2 h-16 w-full bg-green-500"
      //         onClick={() => chooseRole("helper")}
      //       >
      //         <HandHeart className="w-6 h-6" />
      //         <span className="text-lg">I want to help others</span>
      //       </Button>
      //     </Form>
      //   </CardContent>
      // </Card>
//       )}

// {role && !chatJoined && (
//         <div className="mt-6">
//           {waiting ? (
//             <p className="text-yellow-300">Waiting for someone to join...</p>
//           ) : (
//             <p className="text-green-300">Matched! Connecting to chat...</p>
//           )}
//         </div>
//       )}

// {chatJoined && (
//         <div className="w-full max-w-lg bg-gray-800 p-4 rounded-lg mt-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-lg">Room: {roomId}</h2>
//               <p className="text-sm text-gray-400">You are: {username}</p>
//               <p className="text-sm text-gray-400">Role: {role}</p>
//             </div>
//           </div>

//           <div className="h-64 overflow-y-auto bg-gray-700 p-2 mt-2 rounded-md">
//             {messages.map((msg) => (
//               <div key={msg.id} className="p-2 bg-gray-600 my-2 rounded-md">
//                 <strong className="text-blue-400">{msg.username}:</strong>{" "}
//                 {decryptMessage(msg.text)}
//               </div>
//             ))}
//           </div>

//           <div className="flex gap-2 mt-4">
//             <input
//               type="text"
//               className="flex-grow p-2 bg-gray-800 rounded-md"
//               placeholder="Type a message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//             />
//             <button onClick={sendMessage} className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600">
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// // import { ActionFunction, redirect } from "@remix-run/node";
// // import { User } from "~/models/user.server";
// // import { Session } from "~/models/session.server";
// // import { getSession, commitSession } from "~/utils/session.server";
// // import { Form,Link } from "@remix-run/react";
// // import { generateUsername } from "~/lib/username-generator";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "~/components/ui/card";
// // import { Button } from "~/components/ui/button";
// // import { HelpCircle, HandHeart, ArrowLeft } from "lucide-react";
// // import { useEffect, useState } from "react";
// // import { io } from "socket.io-client";
// // import CryptoJS from "crypto-js";

// // const socket = io("http://localhost:5000");
// // const SECRET_KEY = "super-secret-key";

// // export const action: ActionFunction = async ({ request }) => {
// //   const [role, setRole] = useState("");
// //   const [waiting, setWaiting] = useState(false);
// //   const [roomId, setRoomId] = useState("");
// //   const [chatJoined, setChatJoined] = useState(false);
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState("");
// //   const [username] = useState(generateUsername());
// //   const session = await getSession(request);
// //   const formData = await request.formData();

// //   const nickname = `User${Math.floor(Math.random() * 10000)}`;

// //   let match;
// //   if (role === "seeker") {
// //     match = await User.findOne({ role: "helper", sessionId: null });
// //   } else {
// //     match = await User.findOne({ role: "seeker", sessionId: null });
// //   }

// //   let sessionId;
// //   if (match) {
// //     const newSession = await Session.create({
// //       [role]: match._id,
// //       [match.role]: match._id,
// //     });
// //     sessionId = newSession._id;

// //     match.sessionId = newSession._id;
// //     await match.save();

// //     const newUser = await User.create({
// //       nickname,
// //       role,
// //       sessionId: newSession._id,
// //     });
// //     session.set("userId", newUser._id);
// //     session.set("sessionId", sessionId);
// //   } else {
// //     const newUser = await User.create({ nickname, role });
// //     session.set("userId", newUser._id);
// //   }

// //   return redirect(`/chat/${sessionId}`, {
// //     headers: { "Set-Cookie": await commitSession(session) },
// //   });
// // };

// // export default function RolePage() {
// //   return (
// //     <div className="flex items-center min-h-screen">
// //       <Card className="w-full max-w-md mx-auto">
// //         <Link to="/" className="p-4 flex gap-2 hover:text-gray-500">
// //             <ArrowLeft/><span>Go Back</span>
// //         </Link>
// //         <CardHeader>
// //           <CardTitle className="text-2xl font-bold text-center">
// //             How can i assist you today?
// //           </CardTitle>
// //           <CardDescription className="text-center">
// //             Choose an option below
// //           </CardDescription>
// //         </CardHeader>
// //         <CardContent className="flex flex-col space-y-4">
// //           <Form method="post" className="w-full">
// //             <Button
// //               variant="outline"
// //               type="submit"
// //               name="role" 
// //               value="seeker"
// //               className="flex items-center justify-center space-x-2 h-16 w-full bg-blue-500"
// //               onClick={() => console.log("Seek help clicked")}
// //             >
// //               <HelpCircle className="w-6 h-6" />
// //               <span className="text-lg">I need help</span>
// //             </Button>
// //             <Button
// //               variant="outline"
// //               type="submit"
// //              name="role" 
// //              value="helper"
// //               className="flex items-center justify-center space-x-2 h-16 w-full bg-green-500"
// //                 onClick={() => console.log("Offer help clicked")}
// //             >
// //               <HandHeart className="w-6 h-6" />
// //               <span className="text-lg">I want to help others</span>
// //             </Button>
// //           </Form>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }
