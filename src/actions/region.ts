"use server";

import axios from "axios";
import { FormState } from "./../lib/types";
import { cookies } from "next/headers";
import { regionPath, regionPathById } from "@/lib/paths";
import { revalidatePath } from "next/cache";

export async function createRegion(formState: FormState, formData: FormData) {
  const c = await cookies();

  const name = formData.get("name") as string;
  const state = formData.get("state") as string;
  const country = formData.get("country") as string;

  try {
    await axios.post(
      regionPath(),
      {
        name,
        state,
        country,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    revalidatePath("/dashboard/regions");
    revalidatePath("/dashboard/contacts");
    return {
      success: true,
      message: "Region created successfully",
      errors: {},
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;

      return {
        success: false,
        message: "Region creation failed",
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

export async function updateRegion(
  id: string,
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();

  const name = formData.get("name") as string;
  const state = formData.get("state") as string;
  const country = formData.get("country") as string;

  try {
    await axios.patch(
      regionPathById(id),
      {
        name,
        state,
        country,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    revalidatePath("/dashboard/regions");
    revalidatePath("/dashboard/contacts");
    return {
      success: true,
      message: "Region updated successfully",
      errors: {},
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;

      return {
        success: false,
        message: "Region creation failed",
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

export async function deleteRegion(id: string) {
  const c = await cookies();

  try {
    await axios.delete(regionPathById(id), {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });
    revalidatePath("/dashboard/regions");
    revalidatePath("/dashboard/contacts");
    return {
      success: true,
      message: "Region deleted successfully",
      errors: {},
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error);
    } else {
      console.log("An unexpected error occurred while deleting the region");
    }
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      errors:
        error instanceof Error
          ? { _form: error.message }
          : { _form: "An unexpected error occurred" },
    };
  }
}
