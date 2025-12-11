"use server";

import { instagramAccountSearchPath } from "@/lib/paths";
import axios from "axios";

export async function getInstagramAccountByUserId(userId: string) {
  const instagramAccount = await axios.get(
    instagramAccountSearchPath("", "", userId)
  );
  if (instagramAccount.status !== 200) {
    throw new Error("Failed to fetch Instagram account");
  }
  console.log("Instagram Account fetched:", instagramAccount.data);
  return instagramAccount.data;
}
