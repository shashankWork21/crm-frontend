"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, Phone, Lock, Loader2 } from "lucide-react";
import { registerUser } from "@/actions";
import { Role } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-powder-blue-400/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-[-10%] h-96 w-96 -translate-y-1/2 rounded-full bg-oxford-blue-500/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-sunglow-500/30 blur-3xl"
      />

      <div className="relative z-10 mb-4 flex min-h-14 w-full max-w-2xl items-end">
        {showAlert && (
          <Alert
            variant="destructive"
            data-alert
            className="mx-auto border border-sunglow-600/50 bg-sunglow-900 text-rich-black-600 animate-in slide-in-from-top-4 duration-300 fade-in text-center w-fit"
          >
            <AlertTitle className="text-lg font-semibold">Warning</AlertTitle>
            <AlertDescription className="text-rich-black-500">
              Please accept the terms and conditions to proceed.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <Card className="relative z-10 w-full max-w-2xl rounded-3xl border border-powder-blue-700/40 bg-white px-8 py-10 shadow-xl">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-oxford-blue-500 shadow-md">
            <User className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-semibold text-rich-black">
            Create your Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="flex items-center gap-2 text-sm font-medium text-rich-black-500"
              >
                <User className="h-4 w-4 text-oxford-blue-500" />
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                className="h-11 border border-powder-blue-700/40 bg-white focus:border-oxford-blue-400 focus:ring-oxford-blue-400"
              />
              {!!formState.errors.firstName && (
                <ul className="space-y-1 text-sm text-sunglow-500">
                  {formState.errors.firstName.map(
                    (error: string, index: number) => (
                      <li key={index}>{error}</li>
                    )
                  )}
                </ul>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="flex items-center gap-2 text-sm font-medium text-rich-black-500"
              >
                <User className="h-4 w-4 text-oxford-blue-500" />
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
                className="h-11 border border-powder-blue-700/40 bg-white focus:border-oxford-blue-400 focus:ring-oxford-blue-400"
              />
              {!!formState.errors.lastName && (
                <ul className="space-y-1 text-sm text-sunglow-500">
                  {formState.errors.lastName.map(
                    (error: string, index: number) => (
                      <li key={index}>{error}</li>
                    )
                  )}
                </ul>
              )}
            </div>

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
                <ul className="space-y-1 text-sm text-sunglow-500">
                  {formState.errors.email.map(
                    (error: string, index: number) => (
                      <li key={index}>{error}</li>
                    )
                  )}
                </ul>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="flex items-center gap-2 text-sm font-medium text-rich-black-500"
              >
                <Phone className="h-4 w-4 text-oxford-blue-500" />
                Phone Number
              </Label>
              <div className="flex gap-3">
                <Input
                  name="countryCode"
                  type="text"
                  placeholder="+XXX"
                  className="h-11 w-20 border border-powder-blue-700/40 bg-white text-center focus:border-oxford-blue-400 focus:ring-oxford-blue-400"
                />
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  placeholder="Enter your phone number"
                  className="flex-1 h-11 border border-powder-blue-700/40 bg-white focus:border-oxford-blue-400 focus:ring-oxford-blue-400"
                />
              </div>
              {!!formState.errors.countryCode && (
                <ul className="space-y-1 text-sm text-sunglow-500">
                  {formState.errors.countryCode.map(
                    (error: string, index: number) => (
                      <li key={index}>{error}</li>
                    )
                  )}
                </ul>
              )}
              {!!formState.errors.phoneNumber && (
                <ul className="space-y-1 text-sm text-sunglow-500">
                  {formState.errors.phoneNumber.map(
                    (error: string, index: number) => (
                      <li key={index}>{error}</li>
                    )
                  )}
                </ul>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="chosenPassword"
                className="flex items-center gap-2 text-sm font-medium text-rich-black-500"
              >
                <Lock className="h-4 w-4 text-oxford-blue-500" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="chosenPassword"
                  name="chosenPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="h-11 border border-powder-blue-700/40 bg-white pr-12 focus:border-oxford-blue-400 focus:ring-oxford-blue-400"
                  onPaste={(e) => e.preventDefault()}
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
              {!!formState.errors.chosenPassword && (
                <ul className="space-y-1 text-sm text-sunglow-500">
                  {formState.errors.chosenPassword.map(
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
                  placeholder="Confirm your password"
                  className="h-11 border border-powder-blue-700/40 bg-white pr-12 focus:border-oxford-blue-400 focus:ring-oxford-blue-400"
                  onPaste={(e) => e.preventDefault()}
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
            <div className="flex flex-row items-center gap-3 rounded-lg border border-powder-blue-700/40 bg-powder-blue-900/30 px-4 py-3">
              <Checkbox
                className="border border-powder-blue-600 data-[state=checked]:bg-sunglow data-[state=checked]:text-rich-black"
                checked={acceptedTerms}
                onCheckedChange={() => setAcceptedTerms(!acceptedTerms)}
              />
              <p className="text-sm text-rich-black-500">
                I&apos;ve read and accept the{" "}
                <TncDialog onAccept={() => setAcceptedTerms(true)} />
              </p>
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
                  Creating Account...
                </div>
              ) : (
                "Create Account"
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
