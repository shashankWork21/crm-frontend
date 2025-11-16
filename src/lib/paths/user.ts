export function teamPath(organisationId: string) {
  return `${process.env.BACKEND_URL}/team/${organisationId}`;
}
export function teamSearchPath(organisationId: string, searchTerm: string) {
  return `${process.env.BACKEND_URL}/team/search/${organisationId}?searchTerm=${searchTerm}`;
}

export function changeRolePathById(id: string) {
  return `${process.env.BACKEND_URL}/users/role/${id}`;
}

export function userPathById(id: string) {
  return `${process.env.BACKEND_URL}/users/${id}`;
}
