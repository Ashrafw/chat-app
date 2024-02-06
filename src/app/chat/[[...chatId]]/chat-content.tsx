"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import axios from "axios";
import MessageList from "@/components/MessageList";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { auth } from "@clerk/nextjs";
export default function ChatContent({
  chatId,
  userId,
}: {
  chatId?: string;
  userId?: string;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["get-messages", chatId, userId],
    queryFn: async () => {
      const response = await axios.post("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
  console.log("data", data);
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/messages",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });
  useEffect(() => {
    const messageContainer = document.getElementById("message-cont");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  console.log("messages", messages);
  return (
    <div className=" w-full  h-full flex flex-col bg-slate-50 shadow-xl  rounded-lg overflow-hidden ">
      <div className="h-[calc(100%-56px)]   p-2 bg-gray-50 overflow-auto ">
        <div className="max-w-5xl m-auto pb-10 pt-4">
          <div className=" h-[90%]  py-4 overflow-auto mb-10" id="message-cont">
            <MessageList messages={messages} />
          </div>
        </div>
      </div>
      <div className="  w-full  m-auto  bg-primary">
        <div className="prose m-auto w-full">
          <form onSubmit={handleSubmit} className="sticky bottom-0 inset-x-0 px-1 py-3 ">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask any question..."
                className="w-full "
              />
              <Button className="bg-slate-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
