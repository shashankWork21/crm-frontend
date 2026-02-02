"use server";

import {
  organisationForTeam,
  organisationPathById,
  contactOrgaisationPathById,
} from "@/lib/paths";
import { cookies } from "next/headers";
import { cache } from "react";

export const getTeamOranisations = cache(async () => {
  const c = await cookies();
  const response = await fetch(organisationForTeam(), {
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${c.get("session")?.value || ""}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch organisations");
  }

  return response.json();
});

export const getOrganisationById = cache(async (organisationId: string) => {
  const c = await cookies();
  const response = await fetch(organisationPathById(organisationId), {
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${c.get("session")?.value || ""}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch organisation");
  }

  return response.json();
});

export const getContactOrganisations = cache(async (organisationId: string) => {
  const c = await cookies();
  const response = await fetch(contactOrgaisationPathById(organisationId), {
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${c.get("session")?.value || ""}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch organisation");
  }

  return response.json();
});
