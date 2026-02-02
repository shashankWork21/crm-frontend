"use server";

import { cookies } from "next/headers";
import { cityPath } from "@/lib/paths";

export async function createCity(name: string, stateId: string) {
  const c = await cookies();
  try {
    const response = await fetch(cityPath(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
      body: JSON.stringify({ name, stateId }),
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        message: "City creation failed",
        errors: JSON.parse(data.errors),
      };
    }

    const result = await response.json();
    return {
      success: true,
      message: "City created successfully",
      errors: {},
      city: result,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unexpected error occurred",
      errors: {},
    };
  }
}
