export function contactCreatePath() {
  return `${process.env.BACKEND_URL}/contact`;
}

export function bulkCreateContactsPath() {
  return `${process.env.BACKEND_URL}/contact/bulk`;
}

export function contactPathById(id: string) {
  return `${process.env.BACKEND_URL}/contact/${id}`;
}

export function contactPathByOurOrganisationId(organisationId: string) {
  return `${process.env.BACKEND_URL}/contact/our-organisation/${organisationId}`;
}

export function contactPathByTheirOrganisationId(organisationId: string) {
  return `${process.env.BACKEND_URL}/contact/their-organisation/${organisationId}`;
}
