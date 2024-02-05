import { NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { content } = await req.json();
  console.log("server content", content);
  //   Ask OpenAI for a streaming chat completion given the prompt

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content }],
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 1000,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
