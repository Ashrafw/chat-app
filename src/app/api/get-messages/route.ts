import { getXataClient } from "@/xata";
import { NextResponse } from "next/server";

const runtime = "edge";

export const POST = async (req: Request) => {
  const { chatId } = await req.json();
  const xataClient = getXataClient();
  // const _messages = await xataClient.db.messages.filter({ chatId }).getAll();

  if (!chatId) return NextResponse.json(null);
  const _messages = await xataClient.db.messages
    .filter({ chatId })
    .sort("createdAt", "asc")
    .getAll();

  return NextResponse.json(_messages);
};
