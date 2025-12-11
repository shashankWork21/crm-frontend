"use server";

import { tokenPath } from "@/lib/paths";
import {
  instagramAccountPath,
  instagramAccountSearchPath,
} from "@/lib/paths/instagram-account";
import { instagramScopes } from "@/lib/scopes";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const c = await cookies();
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
    const response = await axios.post(tokenUrl, body.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const item = response.data;

    const { access_token, user_id, permissions } = item;

    const existingAccountResponse = await axios.get(
      instagramAccountSearchPath(user_id, "", ""),
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `session=${c.get("session")?.value || ""}`,
        },
      }
    );

    const existingAccount = existingAccountResponse.data;

    console.log("Existing Instagram Account check:", existingAccount);

    if (existingAccount.data) {
      console.log(
        "Instagram Account already linked:",
        existingAccount.data?.id
      );
    } else {
      const longLivedTokenUrl = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${client_secret}&access_token=${access_token}`;

      const longLivedTokenResponse = await axios.get(longLivedTokenUrl);

      const longLivedAccessToken = longLivedTokenResponse.data.access_token;

      const scopes = permissions
        .map(
          (permission: string) =>
            instagramScopes.find((item) => item.value === permission)?.scope ||
            null
        )
        .filter((scope: string | null) => scope !== null);

      const tokenResponse = await axios.post(
        tokenPath(),
        {
          accessToken: longLivedAccessToken,
          scopes,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `session=${c.get("session")?.value || ""}`,
          },
        }
      );

      const tokenId = tokenResponse.data.id;

      console.log("Token ID:", tokenId);

      const instagramAccount = await axios.post(
        instagramAccountPath(),
        {
          instagramId: `${user_id}`,
          tokenId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `session=${c.get("session")?.value || ""}`,
          },
        }
      );
      console.log("Instagram Account linked:", instagramAccount.data);
    }
  } catch (error) {
    console.log("Error fetching access token:", JSON.stringify(error));
  }
  redirect("/lead-magnets");
}
