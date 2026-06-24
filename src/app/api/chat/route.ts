import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: google("gemini-3.5-flash"),
      system:
        "You are a helpful AI assistant. Use Markdown to format your responses when it improves clarity. Support headings, lists, bold, italic, code blocks, inline code, and links.",
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[chat]", error);
    return Response.json(
      { error: "Failed to generate response. Please try again." },
      { status: 500 },
    );
  }
}
