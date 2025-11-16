import ResetPasswordForm from "@/components/auth/reset-password-form";
import { getUserIdFromKey } from "@/db/team.queries";
import { redirect } from "next/navigation";
export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { key?: string };
}) {
  try {
    const userId = await getUserIdFromKey(searchParams.key as string);
    console.log(userId);
    return <ResetPasswordForm userId={userId} />;
  } catch (error) {
    // Handle error (e.g., invalid or expired key)
    console.log(error);
    redirect("/");
  }
}
