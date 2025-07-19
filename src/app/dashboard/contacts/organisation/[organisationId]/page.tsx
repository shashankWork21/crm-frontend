import { validateSession } from "@/actions";
import OrganisationPageView from "@/components/views/organisation-page";
import { getContactByTheirOrganisation } from "@/db/contact.queries";
import { getOrganisationById } from "@/db/organisation.queries";
import { getTeamMembers } from "@/db/team.queries";
import { redirect } from "next/navigation";

interface ContactsByOrganisationPageProps {
  params: Promise<{
    organisationId: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function ContactsByOrganisationPage({
  params,
}: ContactsByOrganisationPageProps) {
  try {
    const { organisationId } = await params;
    const { user } = await validateSession();
    const organisation = await getOrganisationById(organisationId);
    const contacts = await getContactByTheirOrganisation(organisationId);
    const team = await getTeamMembers(user.organisationId);
    return (
      <OrganisationPageView
        organisation={organisation}
        contacts={contacts}
        team={team}
      />
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching organisation:", error.message);
    }
    redirect("/login");
  }
}
