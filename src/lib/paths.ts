export function registerAdminPath() {
  return `${process.env.BACKEND_URL}/register/admin`;
}

export function registerEmployeePath() {
  return `${process.env.BACKEND_URL}/register/employee`;
}

export function orgaisationPath() {
  return `${process.env.BACKEND_URL}/organisation`;
}
export function contactOrgaisationPathById(organisationId: string) {
  return `${process.env.BACKEND_URL}/organisation/contacts/${organisationId}`;
}
export function orgaisationPathById(organisationId: string) {
  return `${process.env.BACKEND_URL}/organisation/${organisationId}`;
}

export function branchPath() {
  return `${process.env.BACKEND_URL}/branch`;
}

export function regionPath() {
  return `${process.env.BACKEND_URL}/region`;
}
export function regionPathById(regionId: string) {
  return `${process.env.BACKEND_URL}/region/${regionId}`;
}
export function regionPathByOrganisationId(organisationId: string) {
  return `${process.env.BACKEND_URL}/region/organisation/${organisationId}`;
}

export function sessionValidatePath() {
  return `${process.env.BACKEND_URL}/sessions/validate`;
}

export function connectUserOrganisationPath() {
  return `${process.env.BACKEND_URL}/user-organisation-update`;
}

export function organisationForTeam() {
  return `${process.env.BACKEND_URL}/organisation/team`;
}

export function contactCreatePath() {
  return `${process.env.BACKEND_URL}/contact`;
}

export function loginPath() {
  return `${process.env.BACKEND_URL}/login`;
}
export function logoutPath() {
  return `${process.env.BACKEND_URL}/logout`;
}

export function schedulePathBulk() {
  return `${process.env.BACKEND_URL}/schedule/bulk`;
}

export function schedulePath() {
  return `${process.env.BACKEND_URL}/schedule`;
}

export function schedulePathById(id: string) {
  return `${process.env.BACKEND_URL}/schedule/${id}`;
}

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

export function branchPathById(id: string) {
  return `${process.env.BACKEND_URL}/branch/${id}`;
}
export function branchPathDeleteByIdForce(id: string) {
  return `${process.env.BACKEND_URL}/branch/force/${id}`;
}

export function bulkCreateRegionsPath() {
  return `${process.env.BACKEND_URL}/region/bulk`;
}
export function bulkCreateOrganisationsPath() {
  return `${process.env.BACKEND_URL}/organisation/bulk`;
}

export function bulkCreateBranchesPath() {
  return `${process.env.BACKEND_URL}/branch/bulk`;
}
export function bulkCreateContactsPath() {
  return `${process.env.BACKEND_URL}/contact/bulk`;
}
export function bulkCreateNotesPath() {
  return `${process.env.BACKEND_URL}/note/bulk`;
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

export function createContactOrganisationPath() {
  return `${process.env.BACKEND_URL}/organisation/contact`;
}

export function activityPath() {
  return `${process.env.BACKEND_URL}/activity`;
}
export function activityPathById(id: string) {
  return `${process.env.BACKEND_URL}/activity/${id}`;
}

export function followUpActivitiesPathByOrganisationId(organisationId: string) {
  return `${process.env.BACKEND_URL}/activity/follow-up/${organisationId}`;
}

export function upcomingContactFollowUpsPath(organisationId: string) {
  return `${process.env.BACKEND_URL}/contact/upcoming-follow-ups/${organisationId}`;
}

export function overdueContactFollowUpsPath(organisationId: string) {
  return `${process.env.BACKEND_URL}/contact/overdue-follow-ups/${organisationId}`;
}

export function contactsByRegionSchedulePath(
  organisationId: string,
  day: number
) {
  return `${process.env.BACKEND_URL}/contact/region-schedule/${organisationId}?day=${day}`;
}

export function activitiesPathByContactId(contactId: string) {
  return `${process.env.BACKEND_URL}/activity/contact/${contactId}`;
}

export function followUpActivitiesPathByActivityId(activityId: string) {
  return `${process.env.BACKEND_URL}/activity/follow-ups/${activityId}`;
}

export function activitiesSearchPath(
  organisationId: string,
  queryParams: string
) {
  return `${process.env.BACKEND_URL}/activity/search/${organisationId}${queryParams}`;
}
