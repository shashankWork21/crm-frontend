import LeadMagnetView from "@/components/views/lead-magnets/lead-magnet-view";
import { getLeadMagnetById } from "@/db/lead-magnet.queries";

interface LeadMagnetItemPageParams {
  params: {
    id: string;
  };
}

export default async function LeadMagnetItemPage({
  params,
}: LeadMagnetItemPageParams) {
  const { id } = await params;
  const leadMagnet = await getLeadMagnetById(id);
  return <LeadMagnetView leadMagnet={leadMagnet} />;
}
