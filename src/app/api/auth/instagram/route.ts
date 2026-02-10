"use server";

import { redirect } from "next/navigation";
import { instagramScopes } from "@/lib/scopes";

export async function GET() {
  const oauthScopes = instagramScopes.map((item) => item.value).join(",");
  const clientId = process.env.META_APP_ID;
  const redirectUri = `${process.env.BASE_URL}/api/auth/instagram/callback`;
  const url = `https://www.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${oauthScopes}&response_type=code`;
  redirect(url);
}
