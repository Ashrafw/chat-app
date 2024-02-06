import Image from "next/image";
import ChatList from "./chat-list";
import ChatContent from "./chat-content";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getXataClient } from "@/xata";
import { revalidatePath } from "next/cache";

export default async function page({ params }: { params: { chatId?: string[] } }) {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const chatId = params.chatId?.[0];
  if (!chatId) {
    const xataClient = getXataClient();
    const chatLength = await xataClient.db.chats.filter({ userId }).getAll();
    const newRecord = { userId, chatName: `New chat ${chatLength.length}` };
    const newChat = await xataClient.db.chats.create(newRecord);
    revalidatePath(`/chat/${newChat.id}`);
    redirect(`/chat/${newChat.id}`);
  }

  const xataClient = getXataClient();
  const chats = await xataClient.db.chats.filter({ userId }).getAll();

  return (
    <main className=" h-[calc(100%)] w-screen flex">
      <div className="w-60 h-full max-h-full border-r border-neutral-300 dark:border-neutral-700 overflow-auto">
        <ChatList chats={chats} chatId={chatId} />
      </div>
      <div className=" w-[calc(100%-240px)] h-[calc(100%-56px)] p-4 bg-slate-300 ">
        <ChatContent chatId={chatId} userId={userId} />
      </div>
    </main>
  );
}
