"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { betterAuthClient } from "@/lib/better-auth";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const FeedNavigationBar = () => {
  const router = useRouter();
  const { data } = betterAuthClient.useSession();
  const user = data?.user;

  return (
    <div className="w-full border-b py-4">
      <div className="w-5xl mx-auto flex flex-row items-center justify-between">
        <span className="font-bold">Platinum</span>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>{user.name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-56">
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {user.image ? (
                      <AvatarImage src={user.image} alt={user.name} />
                    ) : (
                      <AvatarFallback className="rounded-lg">{user.name[0]}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={async () => {
                    const response = await betterAuthClient.signOut();

                    if (response.data) {
                      router.replace("/");
                    }
                  }}
                >
                  <LogOutIcon />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};