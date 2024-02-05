"use client";
import { Search, StopCircle } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
type ChatInputProp = {
  onSubmit: (value: string) => void;
  isStreaming: boolean;
  onStop: () => void;
};
export default function ChatInput({ onSubmit, isStreaming, onStop }: ChatInputProp) {
  const [content, setContent] = useState("");

  const submit = (value: string) => {
    onSubmit?.(value);
    setContent("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(content);
  };

  const handleContentKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      submit(content);
    }
  };
  return (
    <form className="w-full relative" onSubmit={handleSubmit}>
      <Textarea
        className="w-full min-h-[40px] pl-4 text-lg  pt-4 pr-[42px] rounded-xl outline-none leading-3 resize-none overflow-x-clip"
        onChange={(e: any) => setContent(e.target.value)}
        onKeyDown={handleContentKeyDown}
        value={content}
      />
      {isStreaming ? (
        <button
          type="button"
          className="flex absolute right-2 bottom-1/2 translate-y-1/2 transition-all text-slate-700 text-2xl"
        >
          <StopCircle />
        </button>
      ) : (
        <button
          type="button"
          className="flex absolute right-2 bottom-1/2 translate-y-1/2 transition-all text-slate-700 text-2xl"
        >
          <Search />
        </button>
      )}
    </form>
  );
}
