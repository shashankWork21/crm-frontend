import { validateSession } from "@/actions";
import DashboardView from "@/components/views/dashboard/dashboard-view";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  try {
    const { user } = await validateSession();
    console.log("Loaded dashboard data for user:", user);
    return <DashboardView firstName={user?.firstName} />;
  } catch (error) {
    console.log("Error loading dashboard data:", error);
    redirect("/login");
  }
}
