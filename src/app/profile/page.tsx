import { validateSession } from "@/actions";
import ProfilePageView from "@/components/views/profile-page";
import { User } from "@/lib/types";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  let user: User;
  try {
    const sessionObject = await validateSession();
    user = sessionObject.user; // Replace with actual user fetching logic
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching user:", error.message);
    }

    setTimeout(() => {
      redirect("/login");
    }, 2000);

    return <div>Error loading profile</div>;
  }
  return <ProfilePageView user={user} />;
}
