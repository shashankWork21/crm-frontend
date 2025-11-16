"use server";

import { leadMagnetsByOrganisationPath } from "@/lib/paths";
import axios from "axios";
import { cookies } from "next/headers";

export async function getLeadMagnetsByOrganisation(organisationId: string) {
  const c = await cookies();
  const leadMagnets = await axios.get(
    leadMagnetsByOrganisationPath(organisationId),
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    }
  );
  if (leadMagnets.status !== 200) {
    throw new Error("Failed to fetch lead magnets");
  }
  return leadMagnets.data;
}
