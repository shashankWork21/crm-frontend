export function cityPath() {
  return `${process.env.BACKEND_URL}/city`;
}
export function cityPathById(id: string) {
  return `${process.env.BACKEND_URL}/city/${id}`;
}
export function citySearchPath(searchTerm: string, stateId: string) {
  return `${process.env.BACKEND_URL}/city/search?term=${searchTerm}&stateId=${stateId}`;
}
