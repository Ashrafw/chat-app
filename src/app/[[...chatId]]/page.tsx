import Image from "next/image";
import ChatList from "./chat-list";
import ChatContent from "./chat-content";

export default function Home() {
  return (
    <main className=" h-[calc(100%)] w-screen flex">
      <div className="w-60 h-full max-h-full border-r border-neutral-300 dark:border-neutral-700 overflow-auto">
        <ChatList />
      </div>
      <div className=" w-[calc(100%-240px)] h-[calc(100%-56px)] p-4 bg-slate-100 ">
        <ChatContent />
      </div>
    </main>
  );
}
