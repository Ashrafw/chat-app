import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ChatList() {
  return (
    <div className="flex flex-col px-4 pt-4 gap-y-1">
      {[...Array(8)].map((chat, i) => (
        <Link href={`/${i}`} className="truncate">
          <Button variant={"ghost"} className=" w-full bg-slate-50">
            chat.name
          </Button>
        </Link>
      ))}
    </div>
  );
}
