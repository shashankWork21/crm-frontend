import { getLeadMagnetById } from "@/db/lead-magnet.queries";
import LeadMagnetView from "@/components/views/lead-magnets/lead-magnet-view";
import { getToken } from "@/actions/token";
import { getAutomationsByLeadMagnetId } from "@/db/automations.queries";

interface LeadMagnetItemPageParams {
  params: {
    id: string;
  };
}

export default async function LeadMagnetItemPage({
  params,
}: LeadMagnetItemPageParams) {
  const { id } = await params;
  const tokens = await getToken();
  const leadMagnet = await getLeadMagnetById(id);

  const automations = await getAutomationsByLeadMagnetId(id);

  return (
    <LeadMagnetView
      leadMagnet={leadMagnet}
      tokens={tokens}
      automations={automations}
    />
  );
}
