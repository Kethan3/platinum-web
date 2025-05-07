import { z } from "zod";

export const postSchema = z.object({
  id: z.string(),
  text: z.string(),
  author: z.object({
    id: z.string(),
    name: z.string(),
    image: z.string().nullable().optional(),
  }),
});

export const feedSchema = postSchema.array();