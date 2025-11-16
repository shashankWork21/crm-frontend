"use client";

import { startTransition, useActionState, useState } from "react";
import { Eye, EyeOff, Lock, Loader2, KeyRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/actions";

// Placeholder action - replace with your actual action

interface ResetPasswordFormProps {
  userId: string;
}

export default function ResetPasswordForm({ userId }: ResetPasswordFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formState, action] = useActionState(resetPassword.bind(null, userId), {
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

  // Redirect to login after successful password reset
  if (formState.success) {
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }

  return (
    <div className="relative flex min-h-screen bg-transparent flex-col items-center justify-center overflow-hidden px-4 py-16">
      <Card className="relative z-10 w-full max-w-2xl rounded-3xl border border-powder-blue-700/40 bg-white px-8 py-10 shadow-xl">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-oxford-blue-500 shadow-md">
            <KeyRound className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-semibold text-rich-black">
            Reset Password
          </CardTitle>
          <p className="text-sm text-rich-black-500">
            Enter your new password below.
          </p>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-medium text-rich-black-500"
              >
                <Lock className="h-4 w-4 text-oxford-blue-500" />
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  className="h-11 border border-powder-blue-700/40 bg-white pr-12 focus:border-oxford-blue-400 focus:ring-oxford-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-oxford-blue-600 transition-colors hover:text-oxford-blue-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {!!formState.errors.password && (
                <ul className="space-y-1 text-sm text-sunglow-500">
                  {formState.errors.password.map(
                    (error: string, index: number) => (
                      <li key={index}>{error}</li>
                    )
                  )}
                </ul>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="flex items-center gap-2 text-sm font-medium text-rich-black-500"
              >
                <Lock className="h-4 w-4 text-oxford-blue-500" />
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className="h-11 border border-powder-blue-700/40 bg-white pr-12 focus:border-oxford-blue-400 focus:ring-oxford-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-oxford-blue-600 transition-colors hover:text-oxford-blue-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {!!formState.errors.confirmPassword && (
                <ul className="space-y-1 text-sm text-sunglow-500">
                  {formState.errors.confirmPassword.map(
                    (error: string, index: number) => (
                      <li key={index}>{error}</li>
                    )
                  )}
                </ul>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || formState.success}
              className="w-full h-12 bg-sunglow hover:bg-sunglow-600 text-rich-black font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg cursor-pointer"
              variant="default"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Resetting Password...
                </div>
              ) : formState.success ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Redirecting to Login...
                </div>
              ) : (
                "Reset Password"
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
        </CardContent>
      </Card>
    </div>
  );
}
