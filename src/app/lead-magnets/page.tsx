import { validateSession } from "@/actions";
import LeadMagnetView from "@/components/views/lead-magnets/lead-magnet-view";
import { getLeadMagnetsByOrganisation } from "@/db/lead-magnet.queries";

export default async function LeadMagnetsPage() {
  const { user } = await validateSession();
  const leadMagnets = await getLeadMagnetsByOrganisation(
    user?.organisationId as string
  );
  return <LeadMagnetView leadMagnets={leadMagnets} />;
}
