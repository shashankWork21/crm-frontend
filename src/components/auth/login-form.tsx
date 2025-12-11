"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Loader2, Sparkles, ArrowRight } from "lucide-react";
import {
  getSessionCookie,
  loginUser,
  validateSession,
  validateSessionToken,
} from "@/actions";
import { Card, CardContent, CardHeader } from "../ui/card";
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
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 overflow-hidden bg-rich-black">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-sunglow-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-powder-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--rich-black)_70%)]" />
      </div>

      {/* Logo */}
      <Link
        href="/"
        className="relative z-10 flex items-center gap-2 mb-8 text-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-500 rounded-lg px-2 py-1"
      >
        <img src="/initial_logo.svg" alt="Smart CRM Logo" className="w-10 h-10 group-hover:scale-110 transition-transform" />
        <span className="text-2xl font-bold tracking-tight">Smart CRM</span>
      </Link>

      {/* Card */}
      <Card className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center space-y-3 pb-6 pt-8">
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="text-white/60">Sign in to continue to your dashboard</p>
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
                    )
                  )}
                </ul>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-white/80"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 pl-12 pr-12 border border-white/10 bg-white/5 text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-500 rounded"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {!!formState.errors.password && (
                <ul className="space-y-1 text-sm text-red-400">
                  {formState.errors.password.map(
                    (error: string, index: number) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-400" />
                        {error}
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-sunglow-500 hover:text-sunglow-400 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-500 rounded"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || redirecting}
              className="w-full h-12 bg-sunglow-500 hover:bg-sunglow-400 text-rich-black font-bold text-base rounded-xl shadow-lg shadow-sunglow-500/25 hover:shadow-sunglow-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
            >
              {isSubmitting || redirecting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {redirecting ? "Redirecting..." : "Signing in..."}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>

          {/* Error/Success Message */}
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
                New here?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Link href="/register" className="block">
            <Button
              variant="outline"
              className="w-full h-12 border-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/30 font-semibold text-base rounded-xl transition-all duration-300"
            >
              Create an Account
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Bottom Text */}
      <p className="relative z-10 mt-8 text-sm text-white/40">
        By signing in, you agree to our{" "}
        <Link href="/terms-and-conditions" className="text-white/60 hover:text-sunglow-500 transition-colors underline underline-offset-2">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="text-white/60 hover:text-sunglow-500 transition-colors underline underline-offset-2">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
