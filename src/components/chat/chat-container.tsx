"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo, useState } from "react";

import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";

export function ChatContainer() {
  const [input, setInput] = useState("");

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );

  const { messages, sendMessage, status, stop, error } = useChat({
    transport,
  });

  const isLoading = status === "submitted" || status === "streaming";

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    sendMessage({ text: trimmed });
    setInput("");
  };

  return (
    <div className="flex h-dvh flex-col bg-background">
      <header className="flex shrink-0 items-center justify-center border-b border-border px-4 py-3">
        <h1 className="text-sm font-semibold tracking-wide">AI Chatbot</h1>
      </header>

      <main className="flex min-h-0 flex-1 flex-col">
        <ChatMessages messages={messages} isLoading={isLoading} error={error} />
      </main>

      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={setInput}
        onSubmit={handleSubmit}
        onStop={stop}
      />
    </div>
  );
}
