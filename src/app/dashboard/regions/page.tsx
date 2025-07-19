import { validateSession } from "@/actions";
import RegionsPageView from "@/components/views/regions-page";
import { getRegionsByOrganisationId } from "@/db/region.queries";
import { Region } from "@/lib/types";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function RegionsPage() {
  let regions: Region[] = [];
  try {
    const { user } = await validateSession();
    regions = await getRegionsByOrganisationId(user.organisationId);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    redirect("/login");
  }

  return <RegionsPageView regions={regions} />;
}
