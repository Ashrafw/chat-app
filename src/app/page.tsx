import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
// import { getXataClient } from "@/xata";
type Props = {};

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/chat");
  }

  return (
    <div className="min-w-screen min-h-screen text-slate-700  from-gray-900 to-gray-600 bg-gradient-to-r">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50/90 p-6 rounded shadow-xl">
        <div className=" flex items-center justify-center">
          <h1 className=" text-5xl font-extrabold text-slate-700">
            <span className=" font-thin mr-2 text-3xl">enhance with</span>
            Chat<span className=" text-slate-400">ai</span>{" "}
          </h1>
        </div>
        <div className=" flex items center justify-center mt-4">
          {userId && <Button>Go to chat</Button>}
        </div>
        <p className=" text-gray-700 mt-2 max-x-lg text-center text-lg">
          Join millions of students, researchers and professionals to instantly answer
          questions and understand with the power of AI.
        </p>

        <div className=" w-full text-center mt-4">
          {userId ? (
            <h1>Logged In</h1>
          ) : (
            <Link href="/sign-in">
              <Button>
                Login to get started!
                <LogIn className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
