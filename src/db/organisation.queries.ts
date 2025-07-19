"use server";

import {
  organisationForTeam,
  orgaisationPathById,
  contactOrgaisationPathById,
} from "@/lib/paths";
import axios from "axios";
import { cookies } from "next/headers";
import { cache } from "react";

export const getTeamOranisations = cache(async () => {
  const c = await cookies();
  const response = await axios.get(organisationForTeam(), {
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${c.get("session")?.value || ""}`,
    },
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch organisations");
  }

  return response.data;
});

export const getOrganisationById = cache(async (organisationId: string) => {
  const c = await cookies();
  const response = await axios.get(orgaisationPathById(organisationId), {
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${c.get("session")?.value || ""}`,
    },
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch organisation");
  }

  return response.data;
});

export const getContactOrganisations = cache(async (organisationId: string) => {
  const c = await cookies();
  const response = await axios.get(contactOrgaisationPathById(organisationId), {
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${c.get("session")?.value || ""}`,
    },
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch organisation");
  }
  return response.data;
});
