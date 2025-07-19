import LoginForm from "@/components/auth/login-form";

export const dynamic = 'force-dynamic'

export default async function LoginPage() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
