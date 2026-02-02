"use server";

import { cookies } from "next/headers";
import { tagPathByOrganisationId } from "@/lib/paths";
import { validateSession } from "@/actions";

export async function getOrganisationTags() {
  const c = await cookies();

  const { user } = await validateSession();
  try {
    const response = await fetch(
      tagPathByOrganisationId(user?.organisationId as string),
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "An error occurred while fetching tags");
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
}
