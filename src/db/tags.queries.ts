"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { tagPathByOrganisationId } from "@/lib/paths";
import { validateSession } from "@/actions";

export async function getOrganisationTags() {
  const c = await cookies();

  const { user } = await validateSession();
  try {
    const response = await axios.get(
      tagPathByOrganisationId(user?.organisationId as string),
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch tags");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      throw new Error(data.message || "An error occurred while fetching tags");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
