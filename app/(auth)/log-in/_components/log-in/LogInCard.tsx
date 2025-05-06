
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";

import { emailSchema } from "@/lib/extras/schemas/email";
import { Caption } from "@/components/ui/caption";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { betterAuthClient } from "@/lib/better-auth";

export const LogInCard = () => {
  const router = useRouter();

  const [logInError, setLogInError] = useState<Error | null>(null);

  const { Field, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async (value) => {
      const { email, password } = value.value;
      const { error } = await betterAuthClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setLogInError(new Error("Unable to log in currently!"));
        return;
      }

      router.replace("/feed");
    },
  });

  return (
    <Card className="w-md">
      <CardHeader>
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>Enjoy Platinum at its best</CardDescription>
      </CardHeader>

      <Separator />

      <CardContent>
        <form
          className="flex flex-col items-stretch gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
        >
          {/* Email Field */}
          <Field
            name="email"
            validators={{
              onSubmit: (value) => {
                const { error } = emailSchema.safeParse(value.value);

                if (error && error.errors.length > 0) {
                  return error.errors[0].message;
                }
              },
            }}
          >
            {(field) => {
              return (
                <div className="flex flex-col items-stretch gap-2">
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    type="email"
                    placeholder="Email"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors?.length > 0 && (
                    <Caption variant="error">{field.state.meta.errors.join(" | ")}</Caption>
                  )}
                </div>
              );
            }}
          </Field>

          {/* Password Field */}
          <Field
            name="password"
            validators={{
              onSubmit: (value) => {
                const logInPasswordSchema = z.string().min(1, "Password cannot be empty");

                const { error } = logInPasswordSchema.safeParse(value.value);

                if (error && error.errors.length > 0) {
                  return error.errors[0].message;
                }
              },
            }}
          >
            {(field) => {
              return (
                <div className="flex flex-col items-stretch gap-2">
                  <Label htmlFor={field.name}>Password</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    type="password"
                    placeholder="Password"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors?.length > 0 && (
                    <Caption variant="error">{field.state.meta.errors.join(" | ")}</Caption>
                  )}
                </div>
              );
            }}
          </Field>

          <Button type="submit">Log In</Button>
        </form>
      </CardContent>

      <Separator />

      {logInError !== null && (
        <>
          <CardContent>
            <Caption variant="error">{logInError.message}</Caption>
          </CardContent>
          <Separator />
        </>
      )}

      <CardContent>
        Don&apos;t have an account??{" "}
        <Link href="/sign-up" className="underline underline-offset-4">
          Sign Up
        </Link>
      </CardContent>
    </Card>
  );
};