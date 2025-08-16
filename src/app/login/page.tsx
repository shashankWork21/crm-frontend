export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

import { validateSession } from "@/actions";
import LoginForm from "@/components/auth/login-form";
import { User } from "@/lib/types";

export default async function LoginPage() {
  let user: User | null = null;
  try {
    const sessionResponse = await validateSession();
    user = sessionResponse.user;
  } catch (error) {
    console.log(error);
  }
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
}
