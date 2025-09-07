import { validateSession } from "@/actions";
import ContactsByOrganisationView from "@/components/views/contacts/contacts-by-organisation-view";
import { getContactOrganisations } from "@/db/organisation.queries";
import { Organisation } from "@/lib/types";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ContactOrganisationPage() {
  let organisations: Organisation[];
  try {
    const { user } = await validateSession();
    organisations = await getContactOrganisations(
      user?.organisationId as string
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching organisation:", error.message);
    }
    redirect("/login");
  }

  return <ContactsByOrganisationView organisations={organisations} />;
}
