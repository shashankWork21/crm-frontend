"use server";

import { leadMagnetByIdPath, leadMagnetsByOrganisationPath } from "@/lib/paths";

export async function getLeadMagnetsByOrganisation(organisationId: string) {
  const response = await fetch(leadMagnetsByOrganisationPath(organisationId));

  if (!response.ok) {
    throw new Error("Failed to fetch lead magnets");
  }

  return response.json();
}

export async function getLeadMagnetById(id: string) {
  const response = await fetch(leadMagnetByIdPath(id));

  if (!response.ok) {
    throw new Error("Failed to fetch lead magnet");
  }

  return response.json();
}
