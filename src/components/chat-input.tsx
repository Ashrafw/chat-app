import { Search, StopCircle } from "lucide-react";
import { Input } from "./ui/input";

export default async function ChatInput() {
  return (
    <form className="w-full relative">
      <Input className="w-full" />
      {true ? (
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
