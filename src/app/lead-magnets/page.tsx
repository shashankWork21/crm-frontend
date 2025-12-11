import { validateSession } from "@/actions";
import LeadMagnetTableView from "@/components/views/lead-magnets/lead-magnet-table-view";
import { getLeadMagnetsByOrganisation } from "@/db/lead-magnet.queries";

export default async function LeadMagnetsBasePage() {
  const { user } = await validateSession();
  const leadMagnets = await getLeadMagnetsByOrganisation(
    user?.organisationId as string
  );
  return <LeadMagnetTableView leadMagnets={leadMagnets} />;
}
