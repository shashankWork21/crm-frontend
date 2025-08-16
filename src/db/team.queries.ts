"use server";

import { validateSession } from "@/actions";
import { teamPath, teamSearchPath } from "@/lib/paths";
import axios from "axios";
import { cookies } from "next/headers";
import { cache } from "react";

export const getTeamMembers = cache(async (organisationId: string) => {
  const c = await cookies();
  try {
    const response = await axios.get(teamPath(organisationId), {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch team members");
    }

    return response.data;
  } catch (error) {
    throw new Error(
      `Error fetching team members: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
});

export const getTeamMembersBySearchTerm = cache(
  async (searchTerm: string, sessionCookie: string) => {
    const { user } = await validateSession();

    try {
      const response = await axios.get(
        teamSearchPath(user.organisationId as string, searchTerm),
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `session=${sessionCookie}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch team members");
      }

      return response.data;
    } catch (error) {
      throw new Error(
        `Error fetching team members: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
);
