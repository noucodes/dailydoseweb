import type React from "react";

import Link from "next/link";
import Image from "next/image";
import { Coffee } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Password } from "@/components/password";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      {/* Left column - Image */}
      <div className="hidden relative w-full max-w-md flex-col justify-between bg-muted p-10 lg:flex">
        <div className="flex items-center gap-2 z-10">
          <Coffee className="h-6 w-6 text-orange-600" />
          <span className="text-xl font-bold text-white">Daily Dose</span>
        </div>
        <div className="absolute top-0 left-0 h-full w-full flex-1 z-0">
          <Image
            src="/auth.jpg?height=800&width=600"
            alt="Finance illustration"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="z-10">
          <blockquote className="space-y-2 text-white">
            <p className="text-lg">
              "The Daily Dose app makes ordering super easy and fast. It’s
              clean, reliable, and feels modern. I can place my orders in
              seconds—it’s become part of my daily routine!"
            </p>
            <footer className="text-sm">Alex Johnson</footer>
          </blockquote>
        </div>
      </div>

      {/* Right column - Form */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-12 sm:px-6 lg:flex-1 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">
              Start your financial journey today
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="john32"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="09123456789"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Password />
              </div>
            </div>

            <SubmitButton
              className="w-full bg-orange-600 hover:bg-orange-700"
              pendingText="Creating account..."
              formAction={signUpAction}
            >
              Create account
            </SubmitButton>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-medium text-orange-600 hover:underline dark:text-orange-400"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
