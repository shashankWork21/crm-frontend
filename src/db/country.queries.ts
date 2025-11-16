"use server";

import { countrySearchPath } from "@/lib/paths";
import axios from "axios";
import { cookies } from "next/headers";

export async function getCountriesBySearchTerm(searchTerm: string) {
  const c = await cookies();
  const results = await axios.get(countrySearchPath(searchTerm), {
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${c.get("session")?.value || ""}`,
    },
  });
  return results.data;
}
