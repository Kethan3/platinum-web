"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { serverUrl } from "@/lib/environment";
import { feedSchema } from "@/lib/extras/schemas/post";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";


const FeedPage = () => {
  const router = useRouter();
  const { data, error } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      const response = await fetch(`${serverUrl}/feeds`, {
        credentials: "include",
      });

      const json = await response.json();
      console.log(json);
      const feed = feedSchema.parse(json);

      console.log(feed);

      return feed;
    },
  });

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center text-destructive">
          Something went wrong! {error.message}
        </CardContent>
      </Card>
    );
  }

  if (data) {
    return (
      <div className="flex flex-col items-stretch gap-4">
        {data.map((post) => {
          return (
            <Card
              key={post.id}
              onClick={() => {
                router.push("/posts/" + post.id);
              }}
            >
              <CardContent>{post.text}</CardContent>
              <CardFooter>
                <span className="text-sm text-muted-foreground">by {post.author.name}</span>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="flex items-center justify-center">
        <Spinner />
      </CardContent>
    </Card>
  );
};

export default FeedPage;