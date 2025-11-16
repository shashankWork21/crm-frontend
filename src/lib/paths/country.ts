export function countryPath() {
  return `${process.env.BACKEND_URL}/country`;
}
export function countryPathById(id: string) {
  return `${process.env.BACKEND_URL}/country/${id}`;
}
export function countrySearchPath(searchTerm: string) {
  return `${process.env.BACKEND_URL}/country/search?term=${searchTerm}`;
}
