"use server";

import {
  contactPathByOurOrganisationId,
  contactPathByTheirOrganisationId,
} from "@/lib/paths";
import { cookies } from "next/headers";
import { cache } from "react";

export const getContactsByOurOrganisation = cache(
  async (
    organisationId: string,
    directFields?: string,
    relationalFields?: string
  ) => {
    const c = await cookies();
    let url = contactPathByOurOrganisationId(organisationId);
    if (directFields) {
      url = `${url}?select=${directFields}`;
    }
    if (relationalFields) {
      url = `${url}&include=${relationalFields}`;
    }
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch organisation");
    }

    return response.json();
  }
);

export const getContactByTheirOrganisation = cache(
  async (organisationId: string) => {
    const c = await cookies();
    const response = await fetch(
      contactPathByTheirOrganisationId(organisationId),
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch organisation");
    }

    return response.json();
  }
);
