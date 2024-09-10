// app/routes/chat.tsx
import { useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Send, User2 } from "lucide-react";

interface ChatMessage {
  content: string;
  sender: string;
}
interface LoaderData {
  sessionId: string;
}
export function loader({ params }: { params: { sessionId: string } }) {
  return { sessionId: params.sessionId };
}

export default function ChatPage() {
  const { sessionId } = useLoaderData<LoaderData>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const newMessage: ChatMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    const message = { content: input, sender: "You", sessionId };
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => ws.send(JSON.stringify(message));
    setInput("");
  };

  return (
    <div className="flex items-center min-h-screen">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Chat Room: {sessionId}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.sender}</strong>: {msg.content}
              </div>

              // <div
              //   key={index}
              //   className={`flex items-start space-x-2 mb-4 ${
              //     msg.sender === "You" ? "justify-end" : "justify-start"
              //   }`}
              // >
              //   {msg.sender !== "You" && (
              //     <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              //       <User2 className="w-4 h-4 text-primary-foreground" />
              //     </div>
              //   )}
              //   <div
              //     className={`max-w-[70%] rounded-lg p-3 ${
              //       msg.sender === "You"
              //         ? "bg-primary text-primary-foreground"
              //         : "bg-secondary text-secondary-foreground"
              //     }`}
              //   >
              //     <p className="text-sm font-medium mb-1">{msg.sender}</p>
              //     <p className="text-sm">{msg.content}</p>
              //   </div>
              //   {msg.sender === "You" && (
              //     <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              //       <User2 className="w-4 h-4 text-primary-foreground" />
              //     </div>
              //   )}
              // </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          {/* <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className="flex w-full space-x-2"
        > */}
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button onClick={sendMessage} className="bg-blue-500">
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
          {/* </form> */}
        </CardFooter>
      </Card>
    </div>
    // <div>
    //   <h1>Chat Room: {sessionId}</h1>
    //   <div className="chat-box">
    //     {messages.map((msg, index) => (
    //       <div key={index}>
    //         <strong>{msg.sender}</strong>: {msg.content}
    //       </div>
    //     ))}
    //   </div>
    //   <input
    //     value={input}
    //     onChange={(e) => setInput(e.target.value)}
    //     placeholder="Type your message..."
    //   />
    //   <button onClick={sendMessage}>Send</button>
    // </div>
  );
}
