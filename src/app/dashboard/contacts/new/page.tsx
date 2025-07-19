import { validateSession } from "@/actions";
import ContactCreateForm from "@/components/contacts/contact-create-form";
import { getContactOrganisations } from "@/db/organisation.queries";
import { getRegionsByOrganisationId } from "@/db/region.queries";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function CreateContactPage() {
  try {
    const { user } = await validateSession();

    const organisations = await getContactOrganisations(user.organisationId);
    const regions = await getRegionsByOrganisationId(user.organisationId);
    return (
      <ContactCreateForm organisations={organisations} regions={regions} />
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    redirect("/login");
  }
}
