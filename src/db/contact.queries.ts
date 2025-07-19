"use server";

import {
  contactPathByOurOrganisationId,
  contactPathByTheirOrganisationId,
  contactsByRegionSchedulePath,
  overdueContactFollowUpsPath,
  upcomingContactFollowUpsPath,
} from "@/lib/paths";
import axios from "axios";
import { cookies } from "next/headers";
import { cache } from "react";

export const getContactsByOurOrganisation = cache(
  async (organisationId: string) => {
    const c = await cookies();
    const response = await axios.get(
      contactPathByOurOrganisationId(organisationId),
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch organisation");
    }

    return response.data;
  }
);

export const getContactByTheirOrganisation = cache(
  async (organisationId: string) => {
    const c = await cookies();
    const response = await axios.get(
      contactPathByTheirOrganisationId(organisationId),
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch organisation");
    }

    return response.data;
  }
);

export const getUpcomingFollowUps = cache(async (orgaisationId: string) => {
  const c = await cookies();
  const response = await axios.get(
    upcomingContactFollowUpsPath(orgaisationId),
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch upcoming follow-ups");
  }

  return response.data;
});

export const getOverdueFollowUps = cache(async (orgaisationId: string) => {
  const c = await cookies();
  const response = await axios.get(overdueContactFollowUpsPath(orgaisationId), {
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${c.get("session")?.value || ""}`,
    },
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch overdue follow-ups");
  }

  return response.data;
});

export const getContactsByRegionSchedule = cache(
  async (orgaisationId: string, day: number) => {
    const c = await cookies();
    const response = await axios.get(
      contactsByRegionSchedulePath(orgaisationId, day),
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch contacts by region schedule");
    }

    return response.data;
  }
);
