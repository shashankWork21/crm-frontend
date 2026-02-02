"use server";

import { validateSession } from "@/actions";
import { teamPath, teamSearchPath, verifyKeyPath } from "@/lib/paths";
import { cookies } from "next/headers";
import { cache } from "react";

export const getTeamMembers = cache(async (organisationId: string) => {
  const c = await cookies();
  try {
    const response = await fetch(teamPath(organisationId), {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch team members");
    }

    return response.json();
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
      const response = await fetch(
        teamSearchPath(user?.organisationId as string, searchTerm),
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `session=${sessionCookie}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch team members");
      }

      return response.json();
    } catch (error) {
      throw new Error(
        `Error fetching team members: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
);

export const getUserIdFromKey = async (key: string): Promise<string> => {
  const response = await fetch(verifyKeyPath(key));

  if (!response.ok) {
    throw new Error("Failed to verify key");
  }

  const data = await response.json();
  return data.userId;
};
