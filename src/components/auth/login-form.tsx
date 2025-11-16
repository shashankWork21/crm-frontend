"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Loader2, User } from "lucide-react";
import {
  getSessionCookie,
  loginUser,
  validateSession,
  validateSessionToken,
} from "@/actions";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useAuth } from "@/context/auth.context";

export default function LoginForm() {
  const { setUser } = useAuth();
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function verifyUser() {
      try {
        const { user } = await validateSession();
        if (user) {
          setRedirecting(true);
          router.push("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    }
    verifyUser();
  }, [router]);

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formState, action] = useActionState(loginUser, {
    success: false,
    message: "",
    errors: {},
  });

  useEffect(() => {
    if (formState.success) {
      setRedirecting(true);
      const refreshSession = async () => {
        const sessionToken = await getSessionCookie();
        try {
          const { user: result } = await validateSessionToken(sessionToken);
          if (setUser) {
            setUser(result);
          }
          router.push("/dashboard");
        } catch (error) {
          console.error("Failed to refresh session:", error);
        }
      };
      refreshSession();
    }
  }, [formState.success, router, setUser]);

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
          <CardTitle className="text-xl font-semibold text-rich-black">
            <div className="flex flex-row gap-3 mx-auto justify-center items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-oxford-blue-500 shadow-md">
                <User className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-semibold text-rich-black">
                Smart CRM
              </h3>
            </div>
          </CardTitle>
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
                <ul className="space-y-1 text-sm text-red-700">
                  {formState.errors.email?.map(
                    (error: string, index: number) => (
                      <li key={index}>{error}</li>
                    )
                  )}
                </ul>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-medium text-rich-black-500"
              >
                <Lock className="h-4 w-4 text-oxford-blue-500" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
                <ul className="space-y-1 text-sm text-red-700">
                  {formState.errors.password.map(
                    (error: string, index: number) => (
                      <li key={index}>{error}</li>
                    )
                  )}
                </ul>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || redirecting}
              className="w-full h-12 bg-sunglow hover:bg-sunglow-600 text-rich-black font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg cursor-pointer"
              variant="default"
            >
              {isSubmitting || redirecting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {redirecting ? "Redirecting..." : "Logging in..."}
                </div>
              ) : (
                "Login"
              )}
            </Button>

            <div className="text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-oxford-blue-500 hover:text-oxford-blue-600 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>
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

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-rich-black-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase"></div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-lg font-bold text-rich-black-500">New here?</p>
            <Link href="/register">
              <Button
                variant="outline"
                className="w-full h-12 border-2 border-oxford-blue-500 text-oxford-blue-500 hover:bg-oxford-blue-50 font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                Sign Up instead
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
