"use server";

import {
  followUpActivitiesPathByOrganisationId,
  activitiesPathByContactId,
  followUpActivitiesPathByActivityId,
  activitiesSearchPath,
} from "@/lib/paths";
import { cookies } from "next/headers";
import axios from "axios";
import { validateSession } from "@/actions";
import { ActivityType } from "@/lib/types";

export interface SearchActivityParams {
  organisationId: string;
  types?: ActivityType[];
  needFollowUp?: boolean;
  overdue?: boolean;
}

export async function getActivitiesByContactId(contactId: string) {
  const c = await cookies();
  const response = await axios.get(activitiesPathByContactId(contactId), {
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${c.get("session")?.value || ""}`,
    },
  });
  return response.data;
}

export async function getFollowUpActivitesForOrganisation() {
  const c = await cookies();
  const { user } = await validateSession();
  const response = await axios.get(
    followUpActivitiesPathByOrganisationId(user.organisationId as string),
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    }
  );

  return response.data;
}

export async function getFollowUpActivitiesForActivity(activityId: string) {
  const c = await cookies();
  const response = await axios.get(
    followUpActivitiesPathByActivityId(activityId),
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    }
  );
  return response.data;
}

export async function searchActivities(params: SearchActivityParams) {
  const c = await cookies();
  let queryString = "";
  if (params.types && params.types.length > 0) {
    queryString += `?types=${params.types.join(",")}`;
  }
  if (params.needFollowUp !== undefined) {
    queryString += `${queryString ? "&" : "?"}needFollowUp=${
      params.needFollowUp
    }`;
  }
  if (params.overdue !== undefined) {
    queryString += `${queryString ? "&" : "?"}overdue=${params.overdue}`;
  }
  const response = await axios.get(
    activitiesSearchPath(params.organisationId, queryString),
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    }
  );

  return response.data;
}
