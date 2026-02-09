interface TokenSearchParams {
  instagramId?: string;
  appScopedInstagramId?: string;
}

export function tokenPath() {
  return `${process.env.BACKEND_URL}/token`;
}

export function tokenByIdPath(tokenId: string) {
  return `${tokenPath()}/${tokenId}`;
}

export function tokenByUserIdPath(userId: string) {
  return `${tokenPath()}/user/${userId}`;
}

export function tokenSearchPath(params: TokenSearchParams) {
  let basePath = `${tokenPath()}/search?`;
  if (params.instagramId) {
    basePath += `instagramId=${params.instagramId}&`;
  }
  if (params.appScopedInstagramId) {
    basePath += `appScopedInstagramId=${params.appScopedInstagramId}&`;
  }
  return basePath.slice(0, -1); // Remove trailing '&' or '?'
}
