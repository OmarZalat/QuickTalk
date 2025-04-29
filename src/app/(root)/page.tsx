"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import React from "react";
import Header from "../components/header/page";
import styles from "./page.module.scss";
import { IoSendOutline } from "react-icons/io5";

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

    setIsLoading(true);
    setPrompt("");

    setMessages((prevState) => [
      ...prevState,
      { role: "user", content: prompt },
    ]);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const result = await response.json();

    setMessages((prevState) => [
      ...prevState,
      { role: "assistant", content: result },
    ]);

    setIsLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.conversation}>
        <div className={styles.messages}>
          {messages.map((message, index) => (
            <div key={index}>
              {message.role === "user" ? "User: " : "AI: "}
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          ))}
        </div>

        {isLoading && <p>Loading...</p>}
      </div>
      <form className={styles.thread} onSubmit={handleSubmit}>
        <div className={styles.threadWrapper}>
          <input
            className={styles.threadInput}
            value={prompt}
            type="text"
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">
            <IoSendOutline className={styles.submitIcon} />
          </button>
        </div>
      </form>
    </div>
  );
}
