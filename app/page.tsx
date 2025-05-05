"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const RootPage = () => {
  return (
    <div className="h-svh container mx-auto">
      <div className="h-full flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-0.5">
          <h1 className="text-4xl font-extrabold text-balance max-w-prose">Platinum</h1>
          <p className="max-w-prose">Platinum is the world&apos;s largest tech news aggregator!</p>
        </div>

        <div className="flex flex-row items-center gap-4">
          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/log-in">Log In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RootPage;