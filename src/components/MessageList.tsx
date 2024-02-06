import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import React from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { markdownCheck } from "@/lib/utils";
import remarkGfm from "remark-gfm";
type Props = {
  messages: Message[];
};

const MessageList = ({ messages }: Props) => {
  if (!messages) return <div>error</div>;
  return (
    <div className=" flex flex-col gap-6 px-2 mb-10 ">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn("flex", {
            "justify-end pl-10": message.role === "user",
            "justify-start pr-10": message.role === "assistant",
          })}
        >
          <div
            className={cn(
              "rounded shadow-md text-base py-1 px-3 ring-1 ring-gray-900/10",
              {
                " bg-slate-700 text-white": message.role === "user",
                "justify-start pr-10": message.role === "assistant",
              }
            )}
          >
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
                      // style={dark}
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
              {message.content}
            </Markdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
