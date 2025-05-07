"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { CreatePost } from "../create-post/CreatePost";
import { betterAuthClient } from "@/lib/better-auth";

export const FeedSideBar = () => {
  const { data } = betterAuthClient.useSession();
  const user = data?.user;

  return (
    <Card>
      {user && (
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
        </CardHeader>
      )}
      <CardFooter>
        <CreatePost />
      </CardFooter>
    </Card>
  );
};