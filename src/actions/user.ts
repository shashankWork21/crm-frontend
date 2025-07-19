"use server";

import { changeRolePathById, userPathById } from "@/lib/paths";
import { FormState } from "@/lib/types";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function changeUserRole(userId: string, role: string) {
  const c = await cookies();

  try {
    await axios.put(
      changeRolePathById(userId),
      { role },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );
    revalidatePath("/dashboard/team");
    return {
      success: true,
      message: "User role updated successfully",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: data.message || "Failed to update user role",
        errors: JSON.parse(data.errors),
      };
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

export async function deleteUser(userId: string) {
  const c = await cookies();

  try {
    await axios.delete(userPathById(userId), {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });
    revalidatePath("/dashboard/team");

    return {
      success: true,
      message: "User deleted successfully",
      errors: {},
    };
  } catch (error) {
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

export async function modifyProfile(
  userId: string,
  formState: FormState,
  formData: FormData
) {
  const c = await cookies();

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const countryCode = formData.get("countryCode");
  const phoneNumber = formData.get("phoneNumber");

  try {
    const response = await axios.put(
      userPathById(userId),
      {
        firstName,
        lastName,
        countryCode,
        phoneNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );

    revalidatePath("/profile");
    revalidatePath("/dashboard/team");

    return {
      success: true,
      message: response.data.message || "Profile updated successfully",
      errors: {},
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: data.message || "Failed to update profile",
        errors: JSON.parse(data.errors),
      };
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
