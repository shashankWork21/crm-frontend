"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { getSessionCookie, loginUser, validateSessionToken } from "@/actions";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "@/context/auth.context";

export default function LoginForm() {
  const { user, setUser } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const [showPassword, setShowPassword] = useState(false);

  const [formState, action] = useActionState(loginUser, {
    success: false,
    message: "",
    errors: {},
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (formState.success) {
      const refreshSession = async (sessionToken: string) => {
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
      const sessionToken = getSessionCookie();
      timeout = setTimeout(async () => {
        refreshSession(await sessionToken);
      }, 200);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [formState.success, router, setUser]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => action(formData));
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (formState.success) {
      timeout = setTimeout(() => {
        router.push("/dashboard/contacts");
      }, 1000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [formState.success, router]);

  return (
    <Card className="max-w-md mx-auto px-2 mt-20 py-4 shadow-lg bg-gradient-to-br from-slate-200 to-slate-300 border-none">
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold">Welcome Back!</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="bg-white"
            />
            {!!formState.errors.email && (
              <ul>
                {formState.errors.email?.map((error: string, index: number) => (
                  <li key={index} className="text-red-500 text-sm">
                    {error}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="bg-white"
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
            {!!formState.errors.password && (
              <ul>
                {formState.errors.password.map(
                  (error: string, index: number) => (
                    <li key={index} className="text-red-500 text-sm">
                      {error}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
          {formState.message && (
            <p
              className={`w-full text-center text-sm ${
                formState.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {formState.message}
            </p>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
