import { validateSession } from "@/actions";
import DashboardView from "@/components/views/dashboard/dashboard-view";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  try {
    const { user } = await validateSession();
    return <DashboardView firstName={user?.firstName} />;
  } catch (error) {
    redirect("/login");
  }
}
