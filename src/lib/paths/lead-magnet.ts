export function leadMagnetPath() {
  return `${process.env.BACKEND_URL}/lead-magnet`;
}

export function leadMagnetsByOrganisationPath(organisationId: string) {
  return `${leadMagnetPath()}/organisation/${organisationId}`;
}
