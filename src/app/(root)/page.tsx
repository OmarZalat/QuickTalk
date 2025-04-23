"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function Main() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userMessage: ChatMessage = { role: "user", content: prompt };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setPrompt("");
    setIsLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: updatedMessages }),
    });

    const result = await response.json();

    setMessages((prev) => [...prev, { role: "assistant", content: result }]);
    setIsLoading(false);
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.role === "user" ? "User: " : "AI: "}
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ))}
      </div>

      {isLoading && <p>Loading...</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
