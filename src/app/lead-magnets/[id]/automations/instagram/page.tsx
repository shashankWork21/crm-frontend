import CreateIgDMAutomationView from "@/components/views/automations/create-ig-dm-automation-view";
import { getLeadMagnetById } from "@/db/lead-magnet.queries";

export default async function CreateDmAutomationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id: leadMagnetId } = await params;
  const leadMagnet = await getLeadMagnetById(leadMagnetId);
  return (
    <CreateIgDMAutomationView
      leadMagnetId={leadMagnetId}
      title={leadMagnet.title}
    />
  );
}
