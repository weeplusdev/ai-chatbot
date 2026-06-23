import { Bot, User } from "lucide-react";

import { MarkdownContent } from "@/components/chat/markdown-content";
import { cn } from "@/lib/utils";
import type { MessageRole } from "@/types/chat";

interface ChatMessageProps {
  role: MessageRole;
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex w-full gap-3 px-4 py-3",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Bot className="size-4" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[85%] sm:max-w-[75%]",
          isUser ? "order-first" : "flex-1",
        )}
      >
        {isUser ? (
          <div className="rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground">
            <p className="whitespace-pre-wrap">{content}</p>
          </div>
        ) : (
          <div className="rounded-2xl rounded-bl-md bg-muted/40 px-4 py-2.5">
            <MarkdownContent content={content} />
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <User className="size-4" />
        </div>
      )}
    </div>
  );
}
