import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { getXataClient } from "@/xata";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { chatId, messages } = await req.json();
  const lastMessage = messages[messages.length - 1];
  console.log("server content", lastMessage.content);
  console.log("server chatId", chatId);
  //   Ask OpenAI for a streaming chat completion given the prompt
  const xataClient = getXataClient();
  try {
    const response = await openai.chat.completions.create({
      // messages: [{ role: "user", content }],
      messages: [...messages.filter((message: Message) => message.role === "user")],
      model: "gpt-4-vision-preview",
      stream: true,
      max_tokens: 300,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      onStart: async () => {
        // save user message into db
        await xataClient.db.messages.create({
          role: "user",
          content: lastMessage.content,
          chatId,
        });
      },
      onCompletion: async (completion) => {
        // save ai message into db

        await xataClient.db.messages.create({
          chatId,
          role: "assistant",
          content: completion,
        });
      },
    });
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("api/chat route, error", error);
  }
}
