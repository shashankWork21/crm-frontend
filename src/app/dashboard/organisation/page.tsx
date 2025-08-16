import { validateSession } from "@/actions";
import OrganisationPageView from "@/components/views/organisation-page";
import { getOrganisationById } from "@/db/organisation.queries";
import { Organisation } from "@/lib/types";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function OrganisationPage() {
  let organisation: Organisation;
  try {
    const { user } = await validateSession();
    organisation = await getOrganisationById(user.organisationId as string);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching organisation:", error.message);
    }
    redirect("/login");
  }

  return <OrganisationPageView organisation={organisation} />;
}
