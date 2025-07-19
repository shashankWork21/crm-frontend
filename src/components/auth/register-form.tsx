"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from "@/actions";
import { Role } from "@/lib/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface RegisterFormProps {
  role: Role;
}

export default function RegisterForm({ role }: RegisterFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formState, action] = useActionState(registerUser.bind(null, role), {
    success: false,
    message: "",
    errors: {},
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => action(formData));
  }

  useEffect(() => {
    if (formState.success) {
      router.push(
        role === Role.ADMIN ? "/organisation/create" : "/organisation/select"
      );
    }
  }, [formState.success, router, role]);

  return (
    <Card className="max-w-md mx-auto mt-20 px-2 py-4 shadow-lg bg-gradient-to-br from-slate-200 to-slate-300">
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold">
          {role === Role.ADMIN ? "Register Admin" : "Register"}
        </h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Input
              name="firstName"
              type="text"
              placeholder="First Name"
              className="bg-white"
            />
            {!!formState.errors.firstName && (
              <ul>
                {formState.errors.firstName.map(
                  (error: string, index: number) => (
                    <li key={index} className="text-red-600">
                      {error}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
          <div>
            <Input
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="bg-white"
            />
            {!!formState.errors.lastName && (
              <ul>
                {formState.errors.lastName.map(
                  (error: string, index: number) => (
                    <li key={index} className="text-red-600">
                      {error}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
          <div>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="bg-white"
            />
            {!!formState.errors.email && (
              <ul>
                {formState.errors.email.map((error: string, index: number) => (
                  <li key={index} className="text-red-600">
                    {error}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <div className="w-full flex flex-row items-center justify-start space-x-2">
              <Input
                name="countryCode"
                type="text"
                placeholder="+XXX"
                className="basis-1/4 bg-white"
              />
              <Input
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                className="basis-3/4 bg-white"
              />
            </div>
            {!!formState.errors.countryCode && (
              <ul>
                {formState.errors.countryCode.map(
                  (error: string, index: number) => (
                    <li key={index} className="text-red-600">
                      {error}
                    </li>
                  )
                )}
              </ul>
            )}
            {!!formState.errors.phoneNumber && (
              <ul>
                {formState.errors.phoneNumber.map(
                  (error: string, index: number) => (
                    <li key={index} className="text-red-600">
                      {error}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
          <div>
            <div className="relative">
              <Input
                name="chosenPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="bg-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 cursor-pointer" />
                ) : (
                  <Eye className="h-4 w-4 cursor-pointer" />
                )}
              </button>
            </div>
            {!!formState.errors.chosenPassword && (
              <ul>
                {formState.errors.chosenPassword.map(
                  (error: string, index: number) => (
                    <li key={index} className="text-red-600">
                      {error}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>

          <div>
            <div className="relative">
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="bg-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 cursor-pointer" />
                ) : (
                  <Eye className="h-4 w-4 cursor-pointer" />
                )}
              </button>
            </div>
            {!!formState.errors.confirmPassword && (
              <ul>
                {formState.errors.confirmPassword.map(
                  (error: string, index: number) => (
                    <li key={index} className="text-red-600">
                      {error}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 cursor-pointer text-white"
            variant="default"
          >
            Register
          </Button>
        </form>
        {formState.message && (
          <div
            className={`mt-4 w-full text-center ${
              formState.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {formState.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
