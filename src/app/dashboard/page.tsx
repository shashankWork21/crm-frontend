import { validateSession } from "@/actions";
import DashboardPageView from "@/components/views/dashboard-page";
import { getTeamMembers } from "@/db/team.queries";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  try {
    const { user } = await validateSession();
    const team = await getTeamMembers(user?.organisationId as string);
    return (
      <DashboardPageView
        organisationId={user?.organisationId as string}
        team={team}
      />
    );
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    redirect("/login");
  }
}
