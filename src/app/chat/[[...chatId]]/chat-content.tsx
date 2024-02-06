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
import toast from "react-hot-toast";
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
    initialMessages: data?._messages || [],
    onError: (e) =>
      toast.error(data?.limit ? "You have reach your limit of questions" : e.message),
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
      {data?.limit && (
        <div className=" bg-white absolute w-[70%] h-40 flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50/90 p-6 rounded shadow-xl">
          <h1 className="text-3xl font-semibold">
            You have reach the limit of questions you can ask!
          </h1>
        </div>
      )}
      <div className="h-[calc(100%-56px)]   p-2 bg-gray-50 overflow-auto ">
        <div className="max-w-5xl m-auto pb-10 pt-4">
          <div className=" h-[90%]  py-4 overflow-auto mb-10" id="message-cont">
            <MessageList messages={messages} />
          </div>
        </div>
      </div>
      <div className="  w-full  m-auto  bg-primary">
        <div className="prose m-auto w-full">
          {!data?.limit && (
            <form
              onSubmit={handleSubmit}
              className="sticky bottom-0 inset-x-0 px-1 py-3 "
            >
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask any question..."
                  className="w-full "
                  disabled={data.limit || isLoading}
                />
                <Button className="bg-slate-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
