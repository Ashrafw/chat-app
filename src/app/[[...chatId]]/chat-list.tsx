import { Button } from "@/components/ui/button";
import { MessageSquareText, SquarePen } from "lucide-react";
import Link from "next/link";

export default function ChatList() {
  return (
    <div className="  bg-primary h-full">
      <div className=" flex justify-between items-center p-2 px-5  border-b">
        <h1 className=" text font-semibold  text-white">New chat</h1>
        <div className="bg-white rounded w-6 h-6 flex items-center justify-center ">
          <SquarePen size={18} />
        </div>
      </div>
      <div className="flex flex-col px-3 pt-4 gap-y-1">
        {[...Array(8)].map((chat, i) => (
          <Link href={`/${i}`} key={i} className="truncate">
            <Button variant={"ghost"} className=" w-full bg-slate-50">
              chat.name
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
