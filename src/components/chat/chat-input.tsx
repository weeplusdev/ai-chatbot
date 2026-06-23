"use client";

import { ArrowUp, Square } from "lucide-react";
import { type FormEvent, type KeyboardEvent, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onStop: () => void;
}

export function ChatInput({
  input,
  isLoading,
  onInputChange,
  onSubmit,
  onStop,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!input.trim() || isLoading) return;
      onSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-border bg-background/80 px-4 py-4 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-border bg-muted/30 p-2 shadow-sm focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message..."
          rows={1}
          disabled={isLoading}
          className={cn(
            "max-h-40 min-h-10 flex-1 resize-none border-0 bg-transparent px-2 py-2 shadow-none",
            "focus-visible:border-0 focus-visible:ring-0",
          )}
        />

        {isLoading ? (
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={onStop}
            aria-label="Stop generating"
            className="size-9 shrink-0 rounded-xl"
          >
            <Square className="size-4 fill-current" />
          </Button>
        ) : (
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim()}
            aria-label="Send message"
            className="size-9 shrink-0 rounded-xl"
          >
            <ArrowUp className="size-4" />
          </Button>
        )}
      </div>

      <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-muted-foreground">
        AI can make mistakes. Consider checking important information.
      </p>
    </form>
  );
}
