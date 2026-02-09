"use server";

import { leadMagnetByIdPath, leadMagnetsByOrganisationPath } from "@/lib/paths";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getLeadMagnetsByOrganisation(organisationId: string) {
  const c = await cookies();
  const response = await fetch(leadMagnetsByOrganisationPath(organisationId), {
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${c.get("session")?.value || ""}`,
    },
  });

  if (!response.ok) {
    redirect("/login");
  }

  return response.json();
}

export async function getLeadMagnetById(id: string) {
  const response = await fetch(leadMagnetByIdPath(id));

  if (!response.ok) {
    redirect("/login");
  }

  return response.json();
}
