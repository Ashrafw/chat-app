import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const runtime = "edge";

export const POST = async (req: Request) => {
  const { userId } = await auth();
  const { chatId } = await req.json();
  const xataClient = getXataClient();
  // const _messages = await xataClient.db.messages.filter({ chatId }).getAll();

  if (!chatId) return NextResponse.json(null);
  const _messages = await xataClient.db.messages
    .filter({ chatId })
    .sort("createdAt", "asc")
    .getAll();
  if (!userId) return NextResponse.json({ message: "user not authenticated" });

  const _messagesLimit = await xataClient.db.messages.filter({ userId }).getAll();
  const isLimited = _messagesLimit.length >= 16;
  return NextResponse.json({ _messages, limit: isLimited });
};
