"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { registerUser } from "@/actions";
import { Role } from "@/lib/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import TncDialog from "../general/tnc-dialog";

interface RegisterFormProps {
  role: Role;
}

export default function RegisterForm({ role }: RegisterFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [formState, action] = useActionState(registerUser.bind(null, role), {
    success: false,
    message: "",
    errors: {},
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    if (!acceptedTerms) {
      setShowAlert(true);
      setIsSubmitting(false);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => {
      action(formData);
      setIsSubmitting(false);
    });
  }

  useEffect(() => {
    if (formState.success) {
      router.push("/organisation");
    }
  }, [formState.success, router, role]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 overflow-hidden bg-rich-black">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 bg-sunglow-500/10 w-125 h-125 rounded-full blur-[120px]" />
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

      {/* Alert */}
      <div className="relative z-10 mb-4 flex min-h-14 w-full max-w-md items-end">
        {showAlert && (
          <Alert
            variant="destructive"
            data-alert
            className="mx-auto border border-red-500/30 bg-red-500/10 text-red-400 animate-in slide-in-from-top-4 duration-300 fade-in text-center w-fit"
          >
            <AlertTitle className="text-lg font-semibold">Warning</AlertTitle>
            <AlertDescription className="text-red-400/80">
              Please accept the terms and conditions to proceed.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Card */}
      <Card className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/10 bg-oxford-blue backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center space-y-3 pb-6 pt-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sunglow-500/20 border border-sunglow-500/30">
            <User className="h-8 w-8 text-sunglow-500" />
          </div>
          <h1 className="text-3xl font-bold text-white">Create your Account</h1>
          <p className="text-white/60">Join Smart CRM and grow your business</p>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields - Side by Side */}
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium text-white/80"
                >
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    className="h-12 pl-12 border border-white/10 bg-white/5 text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
                  />
                </div>
                {!!formState.errors.firstName && (
                  <ul className="space-y-1 text-sm text-red-400">
                    {formState.errors.firstName.map(
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

              {/* Last Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium text-white/80"
                >
                  Last Name
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    className="h-12 pl-12 border border-white/10 bg-white/5 text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
                  />
                </div>
                {!!formState.errors.lastName && (
                  <ul className="space-y-1 text-sm text-red-400">
                    {formState.errors.lastName.map(
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
            </div>

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
                  {formState.errors.email.map(
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

            {/* Phone Number Field */}
            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-white/80"
              >
                Phone Number
              </Label>
              <div className="flex gap-3">
                <div className="relative w-24">
                  <Input
                    name="countryCode"
                    type="text"
                    placeholder="+91"
                    className="h-12 border border-white/10 bg-white/5 text-white placeholder:text-white/30 rounded-xl text-center focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
                  />
                </div>
                <div className="relative flex-1">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="Enter your phone number"
                    className="h-12 pl-12 border border-white/10 bg-white/5 text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
                  />
                </div>
              </div>
              {!!formState.errors.countryCode && (
                <ul className="space-y-1 text-sm text-red-400">
                  {formState.errors.countryCode.map(
                    (error: string, index: number) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-400" />
                        {error}
                      </li>
                    ),
                  )}
                </ul>
              )}
              {!!formState.errors.phoneNumber && (
                <ul className="space-y-1 text-sm text-red-400">
                  {formState.errors.phoneNumber.map(
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

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="chosenPassword"
                className="text-sm font-medium text-white/80"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="chosenPassword"
                  name="chosenPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="h-12 pl-12 pr-12 border border-white/10 bg-white/5 text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
                  onPaste={(e) => e.preventDefault()}
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
              {!!formState.errors.chosenPassword && (
                <ul className="space-y-1 text-sm text-red-400">
                  {formState.errors.chosenPassword.map(
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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-white/80"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="h-12 pl-12 pr-12 border border-white/10 bg-white/5 text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
                  onPaste={(e) => e.preventDefault()}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-500 rounded"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {!!formState.errors.confirmPassword && (
                <ul className="space-y-1 text-sm text-red-400">
                  {formState.errors.confirmPassword.map(
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

            {/* Terms and Conditions */}
            <div className="flex flex-row items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <Checkbox
                className="border border-white/30 data-[state=checked]:bg-sunglow-500 data-[state=checked]:text-rich-black data-[state=checked]:border-sunglow-500"
                checked={acceptedTerms}
                onCheckedChange={() => setAcceptedTerms(!acceptedTerms)}
              />
              <p className="text-sm text-white/70">
                I&apos;ve read and accept the{" "}
                <TncDialog onAccept={() => setAcceptedTerms(true)} />
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-sunglow-500 hover:bg-sunglow-400 text-rich-black font-bold text-base rounded-xl shadow-lg shadow-sunglow-500/25 hover:shadow-sunglow-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
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
                Already have an account?
              </span>
            </div>
          </div>

          {/* Sign In Link */}
          <Link href="/login" className="block">
            <Button
              variant="outline"
              className="w-full h-12 border-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/30 font-semibold text-base rounded-xl transition-all duration-300"
            >
              Sign In
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Bottom Text */}
      <p className="relative z-10 mt-8 text-sm text-white/40">
        By creating an account, you agree to our{" "}
        <Link
          href="/terms-and-conditions"
          className="text-white/60 hover:text-sunglow-500 transition-colors underline underline-offset-2"
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy-policy"
          className="text-white/60 hover:text-sunglow-500 transition-colors underline underline-offset-2"
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
