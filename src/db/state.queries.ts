"use server";

import { stateSearchPath } from "@/lib/paths";
import axios from "axios";
import { cookies } from "next/headers";

export async function getStatesBySearchTerm(
  searchTerm: string,
  countryId: string
) {
  const c = await cookies();
  const results = await axios.get(stateSearchPath(searchTerm, countryId), {
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${c.get("session")?.value || ""}`,
    },
  });
  return results.data;
}
