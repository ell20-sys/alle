"use client"
import { useState } from "react";
import Wrapper from "~/components/Layout/Wrapper";

export default function FanMailPage() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
    setSubmitted(true);
  };

  return (
    <Wrapper>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 font-borel">Fan Mail</h1>
        <p className="mb-4">
          I'd love to hear from you all, Please send me your message below:
        </p>
        {submitted ? (
          <div className="p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg">
            <p>
              Thank you for your message! I will get back to you as soon as
              possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              className="w-full p-4 border border-gray-300 rounded-lg"
              rows={6}
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </Wrapper>
  );
}
