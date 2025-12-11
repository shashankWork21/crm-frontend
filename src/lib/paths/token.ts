export function tokenPath() {
  return `${process.env.BACKEND_URL}/token`;
}

export function tokenByIdPath(tokenId: string) {
  return `${tokenPath()}/${tokenId}`;
}
