"use client";

import { startTransition, useActionState, useState } from "react";
import { Mail, Loader2, KeyRound, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import Link from "next/link";
import { forgotPassword } from "@/actions";

// Placeholder action - replace with your actual action

export default function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formState, action] = useActionState(forgotPassword, {
    success: false,
    message: "",
    errors: {},
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => {
      action(formData);
      setIsSubmitting(false);
    });
  }

  return (
    <div className="relative flex min-h-screen bg-transparent flex-col items-center justify-center overflow-hidden px-4 py-16">
      <Card className="relative z-10 w-full max-w-2xl rounded-3xl border border-powder-blue-700/40 bg-white px-8 py-10 shadow-xl">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-oxford-blue-500 shadow-md">
            <KeyRound className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-semibold text-rich-black">
            Forgot Password?
          </CardTitle>
          <p className="text-sm text-rich-black-500">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium text-rich-black-500"
              >
                <Mail className="h-4 w-4 text-oxford-blue-500" />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                className="h-11 border border-powder-blue-700/40 bg-white focus:border-oxford-blue-400 focus:ring-oxford-blue-400"
              />
              {!!formState.errors.email && (
                <ul className="space-y-1 text-sm text-red-800">
                  {formState.errors.email?.map(
                    (error: string, index: number) => (
                      <li key={index}>{error}</li>
                    )
                  )}
                </ul>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-sunglow hover:bg-sunglow-600 text-rich-black font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg cursor-pointer"
              variant="default"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </div>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>

          {formState.message && (
            <div
              className={`mt-6 w-full text-center text-sm font-medium ${
                formState.success
                  ? "text-oxford-blue-500"
                  : "text-rich-black-600"
              }`}
            >
              {formState.message}
            </div>
          )}

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-oxford-blue-500 hover:text-oxford-blue-600 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
