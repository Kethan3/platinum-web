"use client";

import { Button } from "@/components/ui/button";
import { betterAuthClient } from "@/lib/better-auth";

import { useRouter } from "next/navigation";
import React from "react";

const FeedPage = () => {
  const router = useRouter();

  return (
    <div className="h-svh w-svw flex items-center justify-center">
      <Button
        onClick={async () => {
          const { error } = await betterAuthClient.signOut();

          if (error) {
            return;
          }

          router.replace("/");
        }}
      >
        Log Out
      </Button>
    </div>
  );
};

export default FeedPage;