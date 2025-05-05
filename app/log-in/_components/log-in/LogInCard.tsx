"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { emailSchema } from "@/lib/extras/schemas/email";
import { passwordSchema } from "@/lib/extras/schemas/password";
import { Caption } from "@/components/ui/caption";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { betterAuthClient } from "@/lib/better-auth";

export const LogInCard = () => {
  const router = useRouter();
  const [logInError, setLogInError] = useState<Error | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async (value) => {
      const { email, password } = value.value;

      const { data, error } = await betterAuthClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setLogInError(new Error("Invalid credentials or login failed"));
        return;
      }

      router.replace("/feed");
    },
  });

  return (
    <Card className="w-md">
      <CardHeader>
        <CardTitle>Log in to your account</CardTitle>
        <CardDescription>Welcome back to Platinum!</CardDescription>
      </CardHeader>

      <Separator />

      <CardContent>
        <form
          className="flex flex-col items-stretch gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* Email Field */}
          <form.Field
            name="email"
            validators={{
              onSubmit: (value) => {
                const { error } = emailSchema.safeParse(value.value);
                if ((error?.errors?.length ?? 0) > 0) {
                  return error?.errors?.[0]?.message ?? "Invalid input";
                }
              },
            }}
          >
            {(field) => (
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
                {field.state.meta.errors && (
                  <Caption variant="error">
                    {field.state.meta.errors.join(" | ")}
                  </Caption>
                )}
              </div>
            )}
          </form.Field>

          {/* Password Field */}
          <form.Field
            name="password"
            validators={{
              onSubmit: (value) => {
                const { error } = passwordSchema.safeParse(value.value);
                if ((error?.errors?.length ?? 0) > 0) {
                  return error?.errors?.[0]?.message ?? "Invalid input";
                }
              },
            }}
          >
            {(field) => (
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
                {field.state.meta.errors && (
                  <Caption variant="error">
                    {field.state.meta.errors.join(" | ")}
                  </Caption>
                )}
              </div>
            )}
          </form.Field>

          <Button type="submit">Log In</Button>
        </form>
      </CardContent>

      <Separator />

      {logInError && (
        <>
          <CardContent>
            <Caption variant="error">{logInError.message}</Caption>
          </CardContent>
          <Separator />
        </>
      )}

      <CardContent>
        Don’t have an account?{" "}
        <Link href="/sign-up" className="underline underline-offset-4">
          Sign up
        </Link>
      </CardContent>
    </Card>
  );
};
