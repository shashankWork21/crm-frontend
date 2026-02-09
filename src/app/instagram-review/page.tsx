import { validateSession } from "@/actions";
import { getToken } from "@/actions/token";
import InstagramReviewView from "@/components/views/reviewer/instagram-review-view";
import { getAutomationsByLeadMagnetId } from "@/db/automations.queries";
import { getLeadMagnetsByOrganisation } from "@/db/lead-magnet.queries";
import { redirect } from "next/navigation";

export default async function InstagramReviewPage() {
  const { user } = await validateSession();
  const tokens = await getToken();
  const leadMagnets = await getLeadMagnetsByOrganisation(
    user?.organisationId || "",
  );
  const automations = await getAutomationsByLeadMagnetId(
    leadMagnets[0]?.id || "",
  );

  if (leadMagnets.length === 0) {
    redirect("/lead-magnets/new");
  }

  return (
    <InstagramReviewView
      leadMagnet={leadMagnets[0]}
      tokens={tokens}
      automations={automations}
    />
  );
}
