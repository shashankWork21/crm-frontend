"use server";

import { citySearchPath } from "@/lib/paths";
import axios from "axios";
import { cookies } from "next/headers";

export async function getCitiesBySearchTerm(
  searchTerm: string,
  stateId: string
) {
  const c = await cookies();
  const results = await axios.get(citySearchPath(searchTerm, stateId), {
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${c.get("session")?.value || ""}`,
    },
  });
  return results.data;
}
