import React from "react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <div className="w-full border-b-1 shadow h-14">
      <div className="m-auto h-full max-w-4xl flex justify-between items-center  ">
        <h1 className=" prose-2xl font-extrabold text-slate-700">
          Chat<span className=" text-slate-400">ai</span>
        </h1>
        <div className=" flex gap-2">
          <Link href="">
            <Button size={"sm"} className={cn("px-5")}>
              Sign up
            </Button>
          </Link>
          <Link href="">
            <Button size={"sm"} variant={"outline"} className={cn("px-5")}>
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
