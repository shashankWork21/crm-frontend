"use server";

import { stateSearchPath } from "@/lib/paths";
import { cookies } from "next/headers";

export async function getStatesBySearchTerm(
  searchTerm: string,
  countryId: string
) {
  const c = await cookies();
  const response = await fetch(stateSearchPath(searchTerm, countryId), {
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${c.get("session")?.value || ""}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch states");
  }

  return response.json();
}
