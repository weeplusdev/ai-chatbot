import type { UIMessage } from "ai";

import type { ChatMessage, MessageRole } from "@/types/chat";

export function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function toChatMessage(message: UIMessage): ChatMessage {
  return {
    id: message.id,
    role: message.role as MessageRole,
    content: getMessageText(message),
    createdAt: new Date(),
  };
}
