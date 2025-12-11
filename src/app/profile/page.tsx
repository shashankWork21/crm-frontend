import { validateSession } from "@/actions";

import { User } from "@/lib/types";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  let user: User;
  try {
    const sessionObject = await validateSession();
    if (!sessionObject?.user) {
      setTimeout(() => {
        redirect("/login");
      }, 2000);
    }
    user = sessionObject?.user as User; // Replace with actual user fetching logic
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching user:", error.message);
    }

    return <div>Error loading profile</div>;
  }
  return <div>{user.firstName}</div>;
}
