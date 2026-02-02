"use server";

import { validateSession } from "@/actions";
import { createInstagramToken, updateInstagramToken } from "@/actions/token";
import { getTokenByInstagramId } from "@/db/token.queries";
import { instagramScopes } from "@/lib/scopes";
import { Platform, User } from "@/lib/types";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { user } = await validateSession();
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    redirect("/");
  }

  const client_id = process.env.META_APP_ID;
  const client_secret = process.env.META_APP_SECRET;
  const grant_type = "authorization_code";
  const redirect_uri = `${process.env.BASE_URL}/api/auth/instagram/callback`;

  const tokenUrl = `https://api.instagram.com/oauth/access_token`;

  const body = new URLSearchParams({
    client_id: client_id!,
    client_secret: client_secret!,
    grant_type,
    redirect_uri,
    code,
  });

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch access token");
    }

    const item = await response.json();

    const { access_token, user_id, permissions } = item;

    const longLivedTokenUrl = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${client_secret}&access_token=${access_token}`;

    const longLivedTokenResponse = await fetch(longLivedTokenUrl);

    if (!longLivedTokenResponse.ok) {
      throw new Error("Failed to fetch long-lived token");
    }

    const longLivedTokenData = await longLivedTokenResponse.json();

    const { access_token: longLivedAccessToken, expires_in } =
      longLivedTokenData;

    const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

    const scopes = permissions
      .map(
        (permission: string) =>
          instagramScopes.find((item) => item.value === permission)?.scope ||
          null,
      )
      .filter((scope: string | null) => scope !== null);

    const existingToken = await getTokenByInstagramId(`${user_id}`);

    if (existingToken) {
      const tokenId = existingToken.id;
      console.log(
        "Instagram Account already linked:",
        existingToken.instagramId,
      );
      await updateInstagramToken(tokenId, {
        accessToken: longLivedAccessToken,
        scopes,
        expiresAt,
      });
    } else {
      const token = await createInstagramToken({
        accessToken: longLivedAccessToken,
        scopes,
        platformId: `${user_id}`,
        platform: Platform.INSTAGRAM,
        expiresAt,
        organisationId: user?.organisationId || "",
        userId: user?.id || "",
      });
      const tokenId = token.id;

      console.log("Token ID:", tokenId);
    }
  } catch (error) {
    console.log("Error fetching access token:", JSON.stringify(error));
  }
  redirect("/lead-magnets");
}
