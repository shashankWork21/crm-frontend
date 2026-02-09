"use server";

import { automationPathById } from "@/lib/paths";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAutomationsByLeadMagnetId(leadMagnetId: string) {
  const c = await cookies();

  const response = await fetch(
    `${process.env.BACKEND_URL}/automations/lead-magnet/${leadMagnetId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${c.get("session")?.value || ""}`,
      },
    },
  );
  if (!response.ok) {
    redirect("/login");
  }

  return response.json();
}

export async function getAutomationById(automationId: string) {
  const c = await cookies();

  const response = await fetch(automationPathById(automationId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${c.get("session")?.value || ""}`,
    },
  });
  if (!response.ok) {
    redirect("/login");
  }

  return response.json();
}
