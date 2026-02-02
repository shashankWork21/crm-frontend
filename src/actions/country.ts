"use server";

import { cookies } from "next/headers";
import { countryPath } from "@/lib/paths";

export async function createCountry(name: string) {
  const c = await cookies();
  try {
    const response = await fetch(countryPath(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        message: "Country creation failed",
        errors: JSON.parse(data.errors),
      };
    }

    const result = await response.json();
    return {
      success: true,
      message: "Country created successfully",
      errors: {},
      country: result,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unexpected error occurred",
      errors: {},
    };
  }
}
