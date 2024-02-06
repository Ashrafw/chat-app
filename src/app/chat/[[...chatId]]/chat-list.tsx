import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateChat from "./create-chat";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ChatsRecord, getXataClient } from "@/xata";
import toast from "react-hot-toast";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const schema = z.object({
  chatName: z.string().min(5),
});

export default function ChatList({
  chats,
  chatId,
}: {
  chats: ChatsRecord[];
  chatId?: string;
}) {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  async function createChat(formData: FormData) {
    "use server";
    const val = formData.get("name");

    const parseForm = schema.parse({
      chatName: formData.get("name"),
    });
    if (!userId) return;

    const newRecord = { ...parseForm, userId };
    const xataClient = getXataClient();
    const newChat = await xataClient.db.chats.create(newRecord);
    revalidatePath(`/chat/${newChat.id}`);
    redirect(`/chat/${newChat.id}`);
  }

  return (
    <div className="  bg-primary h-full">
      <CreateChat createChat={createChat} />

      <div className="flex flex-col px-3 pt-4 gap-y-1">
        {chats.map((chat, i) => (
          <Link href={`/chat/${chat.id}`} key={chat.id} className="truncate">
            <Button
              variant={"ghost"}
              className={` w-full  truncate ${
                chat.id === chatId
                  ? " bg-emerald-500/80 hover:bg-emerald-700 text-white hover:text-white shadow"
                  : " bg-slate-50 "
              }`}
            >
              {chat.chatName}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
