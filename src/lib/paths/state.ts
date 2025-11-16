export function statePath() {
  return `${process.env.BACKEND_URL}/state`;
}
export function statePathById(id: string) {
  return `${process.env.BACKEND_URL}/state/${id}`;
}
export function stateSearchPath(searchTerm: string, countryId: string) {
  return `${process.env.BACKEND_URL}/state/search?term=${searchTerm}&countryId=${countryId}`;
}
