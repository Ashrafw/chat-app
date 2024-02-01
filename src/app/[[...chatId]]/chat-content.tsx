import ChatInput from "@/components/chat-input";
import { markdownCheck } from "@/lib/utils";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
export default async function ChatContent() {
  return (
    <div className=" w-full  h-full flex flex-col bg-slate-50 shadow-xl border rounded-lg overflow-hidden ">
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
            {markdownCheck}
          </Markdown>
        </div>
      </div>
      <div className=" h-14 w-full  p-2 bg-gray-80">
        <div className="prose m-auto ">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}
