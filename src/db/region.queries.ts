"use server";

import { regionPath, regionPathByOrganisationId } from "@/lib/paths";
import axios from "axios";
import { cookies } from "next/headers";
import { cache } from "react";

export const getAllRegions = cache(async () => {
  const c = await cookies();
  const response = await axios.get(regionPath(), {
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${c.get("session")?.value || ""}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch regions");
  }
  return response.data;
});

export const getRegionsByOrganisationId = cache(
  async (organisationId: string) => {
    const c = await cookies();
    const response = await axios.get(
      regionPathByOrganisationId(organisationId),
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch regions");
    }
    return response.data;
  }
);
