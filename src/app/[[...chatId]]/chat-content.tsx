"use client";
import ChatInput from "@/components/chat-input";
import { markdownCheck } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
export default function ChatContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState("");

  const handleSubmit = async (value: string) => {
    setIsLoading(true);
    setAssistantResponse("");

    let body = "";

    body = JSON.stringify({ content: value });
    // console.log("submit", value, file);
    try {
      //   abortControllerRef.current = new AbortController();
      const res = await fetch("/api/message", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
        // signal: abortControllerRef.current.signal,
      });

      if (!res.ok || !res.body) {
        alert("Error sending message");
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        const text = decoder.decode(value);
        setAssistantResponse((currentValue: string) => currentValue + text);
        if (done) {
          break;
        }
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        setIsLoading(false);
        alert("Error sending message");
      }
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  const handleStop = () => {};
  return (
    <div className=" w-full  h-full flex flex-col bg-slate-50 shadow-xl  rounded-lg overflow-hidden ">
      <div className="h-[calc(100%-56px)]   p-2 bg-gray-50 overflow-auto ">
        <div className="prose  m-auto pb-10 pt-4">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    PreTag="div"
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    style={dark}
                    wrapLines={true}
                    wrapLongLines={true}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {assistantResponse}
          </Markdown>
        </div>
      </div>
      <div className="  w-full  m-auto p-3 bg-primary">
        <div className="prose m-auto w-full">
          <ChatInput
            onSubmit={handleSubmit}
            isStreaming={isLoading}
            onStop={handleStop}
          />
        </div>
      </div>
    </div>
  );
}
