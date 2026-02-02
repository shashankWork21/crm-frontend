"use client";

import { startTransition, useActionState, useState } from "react";
import { Mail, Loader2, KeyRound, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import Link from "next/link";
import Image from "next/image";
import { forgotPassword } from "@/actions";

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
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 overflow-hidden bg-rich-black">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 w-125 h-125 bg-sunglow-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-100 h-100 bg-powder-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--rich-black)_70%)]" />
      </div>

      {/* Logo */}
      <Link
        href="/"
        className="relative z-10 flex items-center gap-2 mb-8 text-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-500 rounded-lg px-2 py-1"
      >
        <Image
          src="/initial_logo.svg"
          alt="Smart CRM Logo"
          width={40}
          height={40}
          className="w-10 h-10 group-hover:scale-110 transition-transform"
        />
        <span className="text-2xl font-bold tracking-tight">Smart CRM</span>
      </Link>

      {/* Card */}
      <Card className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-oxford-blue backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center space-y-3 pb-6 pt-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sunglow-500/20 border border-sunglow-500/30">
            <KeyRound className="h-8 w-8 text-sunglow-500" />
          </div>
          <h1 className="text-3xl font-bold text-white">Forgot Password?</h1>
          <p className="text-white/60">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-white/80"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 pl-12 border border-white/10 bg-white/5 text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
                />
              </div>
              {!!formState.errors.email && (
                <ul className="space-y-1 text-sm text-red-400">
                  {formState.errors.email?.map(
                    (error: string, index: number) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-400" />
                        {error}
                      </li>
                    ),
                  )}
                </ul>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-sunglow-500 hover:bg-sunglow-400 text-rich-black font-bold text-base rounded-xl shadow-lg shadow-sunglow-500/25 hover:shadow-sunglow-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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

          {/* Success/Error Message */}
          {formState.message && (
            <div
              className={`w-full text-center text-sm font-medium p-3 rounded-xl ${
                formState.success
                  ? "text-green-400 bg-green-500/10 border border-green-500/20"
                  : "text-red-400 bg-red-500/10 border border-red-500/20"
              }`}
              role="alert"
            >
              {formState.message}
            </div>
          )}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-transparent px-4 text-white/40 uppercase tracking-wider">
                Remember your password?
              </span>
            </div>
          </div>

          {/* Back to Login Link */}
          <Link href="/login" className="block">
            <Button
              variant="outline"
              className="w-full h-12 border-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/30 font-semibold text-base rounded-xl transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Bottom Text */}
      <p className="relative z-10 mt-8 text-sm text-white/40">
        Need help?{" "}
        <Link
          href="/contact-us"
          className="text-white/60 hover:text-sunglow-500 transition-colors underline underline-offset-2"
        >
          Contact Support
        </Link>
      </p>
    </div>
  );
}
