"use server";

import { schedulePathBulk, schedulePathById } from "@/lib/paths";
import { FormState } from "@/lib/types";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { validateSession } from "./auth";

export async function createSchedules(
  params: { regionId: string },
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();
  const { user } = await validateSession();
  const daysOfMonth = formData.getAll("dayOfMonth") as string[];
  const data = daysOfMonth.map((day: string) => ({
    dayOfMonth: parseInt(day),
    regionId: params.regionId,
    createdOrgId: user?.organisationId,
  }));
  try {
    await axios.post(schedulePathBulk(), data, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });
    revalidatePath("/dashboard/regions");
    revalidatePath("/dashboard/contacts");
    return {
      success: true,
      message: "Schedules created successfully",
      errors: {},
    };
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;

      return {
        success: false,
        message: "Contact creation failed",
        errors: JSON.parse(data.errors),
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred",
        errors: {},
      };
    }
  }
}

export async function updateSchedules(
  params: {
    regionId: string;
    ids: string[];
  },
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();
  const daysOfMonth = formData.getAll("dayOfMonth") as string[];
  const data = daysOfMonth.map((day: string) => ({
    dayOfMonth: parseInt(day),
    regionId: params.regionId,
  }));
  try {
    if (data.length > params.ids.length) {
      for (let i = 0; i < params.ids.length; i++) {
        await axios.patch(schedulePathById(params.ids[i]), data[i], {
          headers: {
            "Content-Type": "application/json",
            Cookie: `session=${c.get("session")?.value || ""}`,
          },
        });
      }
      await axios.post(schedulePathBulk(), data.slice(params.ids.length), {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      });
    } else if (data.length < params.ids.length) {
      for (let i = 0; i < data.length; i++) {
        await axios.patch(schedulePathById(params.ids[i]), data[i], {
          headers: {
            "Content-Type": "application/json",
            Cookie: `session=${c.get("session")?.value || ""}`,
          },
        });
      }
      for (let i = data.length; i < params.ids.length; i++) {
        await axios.delete(schedulePathById(params.ids[i]), {
          headers: {
            "Content-Type": "application/json",
            Cookie: `session=${c.get("session")?.value || ""}`,
          },
        });
      }
    } else {
      for (let i = 0; i < params.ids.length; i++) {
        await axios.patch(schedulePathById(params.ids[i]), data[i], {
          headers: {
            "Content-Type": "application/json",
            Cookie: `session=${c.get("session")?.value || ""}`,
          },
        });
      }
    }
    revalidatePath("/dashboard/regions");
    revalidatePath("/dashboard/contacts");
    return {
      success: true,
      message: "Schedule updated successfully",
      errors: {},
    };
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;

      return {
        success: false,
        message: "Schedule update failed",
        errors: JSON.parse(data.errors),
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred",
        errors: {},
      };
    }
  }
}
