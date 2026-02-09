import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!; // Must be 32 bytes (256 bits)

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
  throw new Error("ENCRYPTION_KEY must be exactly 32 characters");
}

export function encrypt(data: object): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);

  const jsonString = JSON.stringify(data);
  let encrypted = cipher.update(jsonString, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  // Combine iv + authTag + encrypted data, all in hex
  const combined = iv.toString("hex") + authTag.toString("hex") + encrypted;

  // Return as base64 for URL-safe string
  return Buffer.from(combined, "hex").toString("base64url");
}

export function decrypt<T = unknown>(encryptedData: string): T | null {
  try {
    // Decode from base64url to hex
    const combined = Buffer.from(encryptedData, "base64url").toString("hex");

    // Extract components (iv: 24 hex chars, authTag: 32 hex chars, rest is data)
    const iv = Buffer.from(combined.slice(0, 24), "hex");
    const authTag = Buffer.from(combined.slice(24, 56), "hex");
    const encrypted = combined.slice(56);

    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return JSON.parse(decrypted) as T;
  } catch {
    return null;
  }
}
