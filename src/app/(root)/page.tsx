"use client";

import { useState } from "react";
import React from "react";
import Header from "../components/header/page";
import styles from "./page.module.scss";
import { IoSendOutline } from "react-icons/io5";
import Message from "../components/message/page";
import ScrollToTop from "react-scroll-to-top";

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
            <Message
              key={index}
              role={message.role}
              content={message.content}
            />
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
      <ScrollToTop className={styles.scrollButton} smooth color="white" />
    </div>
  );
}
