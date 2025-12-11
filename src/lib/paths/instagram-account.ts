export function instagramAccountPath() {
  return `${process.env.BACKEND_URL}/instagram-account`;
}
export function instagramAccountPathById(instagramAccountId: string) {
  return `${process.env.BACKEND_URL}/instagram-account/${instagramAccountId}`;
}
export function instagramAccountSearchPath(
  instagramId: string,
  tokenId: string,
  userId: string
) {
  let paramString = "";
  if (instagramId) {
    paramString += `instagramId=${instagramId}&`;
  }
  if (tokenId) {
    paramString += `tokenId=${tokenId}&`;
  }
  if (userId) {
    paramString += `userId=${userId}&`;
  }
  paramString = paramString.slice(0, -1); // Remove trailing '&'
  return `${process.env.BACKEND_URL}/instagram-account/search?${paramString}`;
}
