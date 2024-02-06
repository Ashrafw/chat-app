"use client";
import { Button } from "@/components/ui/button";
import { Send, SquarePen } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  createChat: (formData: FormData) => void;
};

export default function CreateChat({ createChat }: Props) {
  const [isCreateChat, setIsCreateChat] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  return (
    <div>
      {!isCreateChat ? (
        <div
          onClick={() => setIsCreateChat(true)}
          className=" flex justify-between items-center p-2 px-5 border-b"
        >
          <h1 className=" text font-semibold  text-white">New chat</h1>
          <div className="bg-white rounded w-6 h-6 flex items-center justify-center ">
            <SquarePen size={18} />
          </div>
        </div>
      ) : (
        <form
          action={(formData) => {
            const value = formData.get("name");
            if (value && value.toString().length < 5) {
              toast.error("please more than 5 characters");
            } else {
              createChat(formData);
              ref.current?.reset();
              setIsCreateChat(false);
            }
          }}
          ref={ref}
          className="flex justify-between items-center gap-2  py-3 px-5 border-b bg-white/20 "
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter new chat"
            className="p-1 rounded w-full h-8"
            autoFocus
          />
          <Button
            variant={"secondary"}
            size={"icon"}
            className="bg-white rounded w-6 flex items-center justify-center h-8"
          >
            <Send size={16} />
          </Button>
        </form>
      )}
    </div>
  );
}
