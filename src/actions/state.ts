"use server";

import { cookies } from "next/headers";
import { statePath } from "@/lib/paths";

export async function createState(name: string, countryId: string) {
  const c = await cookies();
  try {
    const response = await fetch(statePath(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
      body: JSON.stringify({ name, countryId }),
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        message: "State creation failed",
        errors: JSON.parse(data.errors),
      };
    }

    const result = await response.json();
    return {
      success: true,
      message: "State created successfully",
      errors: {},
      state: result,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unexpected error occurred",
      errors: {},
    };
  }
}
