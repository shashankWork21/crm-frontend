"use server";

import { leadMagnetByIdPath, leadMagnetsByOrganisationPath } from "@/lib/paths";
import axios from "axios";

export async function getLeadMagnetsByOrganisation(organisationId: string) {
  const leadMagnets = await axios.get(
    leadMagnetsByOrganisationPath(organisationId)
  );
  if (leadMagnets.status !== 200) {
    throw new Error("Failed to fetch lead magnets");
  }
  return leadMagnets.data;
}

export async function getLeadMagnetById(id: string) {
  const leadMagnet = await axios.get(leadMagnetByIdPath(id));
  if (leadMagnet.status !== 200) {
    throw new Error("Failed to fetch lead magnet");
  }
  return leadMagnet.data;
}
