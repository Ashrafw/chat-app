"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MessageSquareText } from "lucide-react";
import { UserButton, auth, useUser } from "@clerk/nextjs";
const Navbar = () => {
  const { user, isLoaded } = useUser();
  return (
    <div className="w-full border-b-1 shadow h-14">
      <div className="m-auto h-full max-w-5xl w-[95%] flex justify-between items-center  ">
        <Link href="/">
          <div className=" flex items-center justify-center gap-1 ">
            <h1 className=" text-2xl font-extrabold text-slate-700">
              Chat<span className=" text-slate-400">ai</span>
            </h1>
            <MessageSquareText className="text-slate-700" />
          </div>
        </Link>

        {user && isLoaded ? (
          <div className="flex gap-2 items-center">
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <div className=" flex gap-2">
            <Link href="/chat">
              <Button size={"sm"} variant={"outline"} className={cn("px-5")}>
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
