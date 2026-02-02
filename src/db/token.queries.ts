"use server";

import { cookies } from "next/headers";

import { tokenByUserIdPath, tokenSearchPath } from "@/lib/paths";

export async function getTokenByInstagramId(instagramId: string) {
  const c = await cookies();
  try {
    const response = await fetch(tokenSearchPath({ instagramId }), {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch token by Instagram ID");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching token by Instagram ID:", error);
    throw error;
  }
}

export async function getTokenByUserId(userId: string) {
  if (!userId) {
    return;
  }
  const c = await cookies();
  try {
    const response = await fetch(tokenByUserIdPath(userId), {
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch token by User ID");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching token by User ID:", error);
    throw error;
  }
}
