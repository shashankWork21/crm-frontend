"use client";

import { getInstagramMedia } from "@/db/instagram.queries";
import { InstagramMedia, Platform, Token } from "@/lib/types";
import { useEffect, useState } from "react";

export default function useInstagramMedia(
  token: Token | null,
  existingMedia: string[],
) {
  const [media, setMedia] = useState([]);
  useEffect(() => {
    async function fetchMedia() {
      if (token?.accessToken && token?.platform === Platform.INSTAGRAM) {
        try {
          const mediaResponse = await getInstagramMedia(token.accessToken);
          setMedia(
            mediaResponse.filter(
              (item: InstagramMedia) => !existingMedia.includes(item.id),
            ),
          );
        } catch (error) {
          console.log("Error fetching Instagram media:", error);
        }
      }
    }
    fetchMedia();
  }, [token?.accessToken, token?.platform]);

  return media;
}
