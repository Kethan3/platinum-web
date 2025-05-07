"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { serverUrl } from "@/lib/environment";
import { tanstackQueryClient } from "@/lib/integrations/tanstack-query";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";

export const CreatePost = () => {
  const [isOpen, setIsOpen] = useState(false);

  const createPostMutation = useMutation({
    mutationFn: async (parameters: { text: string }) => {
      const response = await fetch(`${serverUrl}/posts`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          text: parameters.text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
    },
    onSuccess: () => {
      setIsOpen(false);
      tanstackQueryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });

  const { Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      text: "",
    },
    onSubmit: ({ value }) => {
      const { text } = value;

      createPostMutation.mutate({ text });
    },
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Create Post
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>What&apos;s is on your mind?</DialogTitle>
          <DialogDescription>Politics, tech, climate or anything else...</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit(e);
          }}
          className="flex flex-col items-stretch gap-4"
        >
          <Field
            name="text"
            validators={{
              onChange: ({ value }) => {
                if (value.length === 0) {
                  return "Empty string";
                }
              },
            }}
          >
            {(field) => {
              return (
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Type your post here ..."
                  className="resize-none h-32"
                />
              );
            }}
          </Field>

          <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isPristine]}>
            {([canSubmit, isSubmitting, isPristine]) => {
              return (
                <Button
                  disabled={!canSubmit || isSubmitting || isPristine || createPostMutation.isPending}
                  type="submit"
                >
                  {createPostMutation.isPending && <Spinner />}
                  Create
                </Button>
              );
            }}
          </Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
};