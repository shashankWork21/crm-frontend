"use server";

import { countrySearchPath } from "@/lib/paths";
import { cookies } from "next/headers";

export async function getCountriesBySearchTerm(searchTerm: string) {
  const c = await cookies();
  const response = await fetch(countrySearchPath(searchTerm), {
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${c.get("session")?.value || ""}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  return response.json();
}
