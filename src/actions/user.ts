"use server";

import { changeRolePathById, userPathById } from "@/lib/paths";
import { FormState } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function changeUserRole(userId: string, role: string) {
  const c = await cookies();

  try {
    const response = await fetch(changeRolePathById(userId), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
      body: JSON.stringify({ role }),
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        message: data.message || "Failed to update user role",
        errors: JSON.parse(data.errors),
      };
    }

    revalidatePath("/dashboard/team");
    return {
      success: true,
      message: "User role updated successfully",
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

export async function deleteUser(userId: string) {
  const c = await cookies();

  try {
    const response = await fetch(userPathById(userId), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

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
    const response = await fetch(userPathById(userId), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        countryCode,
        phoneNumber,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        message: data.message || "Failed to update profile",
        errors: JSON.parse(data.errors),
      };
    }

    const responseData = await response.json();

    revalidatePath("/profile");
    revalidatePath("/dashboard/team");

    return {
      success: true,
      message: responseData.message || "Profile updated successfully",
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
