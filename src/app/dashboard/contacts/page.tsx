import { validateSession } from "@/actions";
import ContactPageView from "@/components/views/contacts/contact-page";
import { getContactsByOurOrganisation } from "@/db/contact.queries";
import { getTeamMembers } from "@/db/team.queries";
import { Contact, User } from "@/lib/types";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  let contacts: Contact[] = [];
  let team: User[] = [];
  try {
    const { user } = await validateSession();
    contacts = await getContactsByOurOrganisation(
      user?.organisationId as string
    );
    team = await getTeamMembers(user?.organisationId as string);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    redirect("/login");
  }

  return <ContactPageView contacts={contacts} team={team} />;
}
