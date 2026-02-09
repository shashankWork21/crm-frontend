"use server";

import { encrypt } from "@/lib/crypto";

export async function encryptData(data: object): Promise<string> {
  return encrypt(data);
}
