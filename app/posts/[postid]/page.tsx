import { serverUrl } from "@/lib/environment";
import { postSchema } from "@/lib/extras/schemas/post";
import { headers } from "next/headers";
import React from "react";

const PostPage = async ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = await params;

  const response = await fetch(`${serverUrl}/posts/${postId}`, {
    headers: await headers(),
  });

  const json = await response.json();
  const data = postSchema.parse(json);

  return <div>{data.text}</div>;
};

export default PostPage;