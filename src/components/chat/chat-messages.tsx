"use client";

import { useEffect, useRef } from "react";
import type { UIMessage } from "ai";

import { ChatLoadingIndicator } from "@/components/chat/chat-loading-indicator";
import { ChatMessage } from "@/components/chat/chat-message";
import { getMessageText } from "@/lib/chat-utils";
import type { MessageRole } from "@/types/chat";

interface ChatMessagesProps {
  messages: UIMessage[];
  isLoading: boolean;
  error: Error | undefined;
}

export function ChatMessages({ messages, isLoading, error }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
        <div className="rounded-full bg-primary/10 p-4">
          <span className="text-3xl">💬</span>
        </div>
        <h2 className="text-lg font-semibold">How can I help you today?</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Ask anything — I can explain concepts, write code, brainstorm ideas, and
          more.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          role={message.role as MessageRole}
          content={getMessageText(message)}
        />
      ))}

      {isLoading && <ChatLoadingIndicator />}

      {error && (
        <div className="mx-4 mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error.message || "Something went wrong. Please try again."}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
