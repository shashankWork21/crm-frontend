export function tagPath() {
  return `${process.env.BACKEND_URL}/tags`;
}
export function tagPathById(id: string) {
  return `${process.env.BACKEND_URL}/tags/${id}`;
}

export function tagPathByOrganisationId(organisationId: string) {
  return `${process.env.BACKEND_URL}/tags/organisation/${organisationId}`;
}

export function tagConnectPath(entity: string, entityId: string) {
  return `${process.env.BACKEND_URL}/tags/connect/${entity}/${entityId}`;
}
