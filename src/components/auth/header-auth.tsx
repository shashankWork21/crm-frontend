"use client";
import { useAuth } from "@/context/auth.context";
import Link from "next/link";
import { Button } from "../ui/button";
import { logoutUser } from "@/actions";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HeaderAuth() {
  const { user } = useAuth();

  const [formState, action] = useActionState(logoutUser, {
    success: false,
    message: "",
    errors: {},
  });

  const router = useRouter();

  useEffect(() => {
    if (formState.success) {
      router.push("/login");
    }
  }, [formState.success, router]);

  const buttons = !!user ? (
    <>
      <form action={action}>
        <Button
          type="submit"
          className="border border-slate-100 text-slate-100 hover:bg-slate-600 cursor-pointer"
        >
          Logout
        </Button>
      </form>
    </>
  ) : (
    <>
      <Link
        href="/login"
        className="text-sm font-medium text-slate-100 hover:text-slate-50 px-4 py-2 border border-slate-100 shadow-md"
      >
        Login
      </Link>{" "}
      <Link
        href="/register"
        className="bg-slate-100 text-black px-4 py-2 rounded hover:bg-slate-300 shadow-md"
      >
        Register
      </Link>
    </>
  );

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="flex flex-row items-center justify-center space-x-3">
        {buttons}
      </div>
      {!formState.success && !!formState.message && (
        <p className="text-red-300 text-sm">Logout failed</p>
      )}
    </div>
  );
}
