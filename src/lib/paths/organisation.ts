export function organisationPath() {
  return `${process.env.BACKEND_URL}/organisation`;
}
export function organisationPathById(id: string) {
  return `${process.env.BACKEND_URL}/organisation/${id}`;
}
export function organisationSearchPath(queryParams: string) {
  return `${process.env.BACKEND_URL}/organisation/search${queryParams}`;
}
export function contactOrgaisationPathById(organisationId: string) {
  return `${process.env.BACKEND_URL}/organisation/contacts/${organisationId}`;
}
export function connectUserOrganisationPath() {
  return `${process.env.BACKEND_URL}/user-organisation-update`;
}
export function organisationForTeam() {
  return `${process.env.BACKEND_URL}/organisation/team`;
}
export function bulkCreateOrganisationsPath() {
  return `${process.env.BACKEND_URL}/organisation/bulk`;
}
export function createContactOrganisationPath() {
  return `${process.env.BACKEND_URL}/organisation/contact`;
}
