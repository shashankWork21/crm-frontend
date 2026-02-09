import UpdateIgDMAutomationView from "@/components/views/automations/update-ig-dm-automation-view";
import { getAutomationById } from "@/db/automations.queries";

export default async function EditInstagramAutomationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id: automationId } = await params;
  const automation = await getAutomationById(automationId);

  return <UpdateIgDMAutomationView defaultValues={automation} />;
}
