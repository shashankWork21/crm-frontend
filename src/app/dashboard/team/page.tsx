import { validateSession } from "@/actions";
import TeamPageView from "@/components/views/team-page";
import { getTeamMembers } from "@/db/team.queries";
import { User } from "@/lib/types";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  let team: User[] = [];
  try {
    const { user } = await validateSession();
    team = await getTeamMembers(user?.organisationId as string);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    redirect("/login");
  }

  return <TeamPageView team={team} />;
}
