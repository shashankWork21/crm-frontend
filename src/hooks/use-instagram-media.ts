"use client";

import { getInstagramMedia } from "@/db/instagram.queries";
import { Platform, Token } from "@/lib/types";
import { useEffect, useState } from "react";

export default function useInstagramMedia(token: Token | null) {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    async function fetchMedia() {
      if (token?.accessToken && token?.platform === Platform.INSTAGRAM) {
        try {
          const mediaResponse = await getInstagramMedia(token.accessToken);
          setMedia(mediaResponse);
        } catch (error) {
          console.log("Error fetching Instagram media:", error);
        }
      }
    }
    fetchMedia();
  }, [token?.accessToken, token?.platform]);

  return media;
}
