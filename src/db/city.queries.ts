"use server";

import { citySearchPath } from "@/lib/paths";
import { cookies } from "next/headers";

export async function getCitiesBySearchTerm(
  searchTerm: string,
  stateId: string
) {
  const c = await cookies();
  const response = await fetch(citySearchPath(searchTerm, stateId), {
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${c.get("session")?.value || ""}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cities");
  }

  return response.json();
}
