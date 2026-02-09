import CreateIgDMAutomationView from "@/components/views/automations/create-ig-dm-automation-view";

import { getLeadMagnetById } from "@/db/lead-magnet.queries";
import { decrypt } from "@/lib/crypto";

interface DecodedAssetData {
  asset_id: string;
  asset_url: string;
  asset_type: "instagram_post" | "instagram_story";
}

export default async function CreateDmAutomationPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { data?: string };
}) {
  const { id: leadMagnetId } = await params;
  const { data: encryptedData } = await searchParams;
  const leadMagnet = await getLeadMagnetById(leadMagnetId);

  const assetData = encryptedData
    ? decrypt<DecodedAssetData>(encryptedData)
    : null;

  return (
    <CreateIgDMAutomationView
      leadMagnetId={leadMagnetId}
      title={leadMagnet.title}
      assetId={assetData?.asset_id!}
      assetUrl={assetData?.asset_url!}
      assetType={assetData?.asset_type as "instagram_post" | "instagram_story"}
    />
  );
}
