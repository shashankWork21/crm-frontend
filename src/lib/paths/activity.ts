export function activityPath() {
  return `${process.env.BACKEND_URL}/activity`;
}
export function activityPathById(id: string) {
  return `${process.env.BACKEND_URL}/activity/${id}`;
}

export function activitiesSearchPath(
  organisationId: string,
  queryParams: string
) {
  return `${process.env.BACKEND_URL}/activity/search/${organisationId}${queryParams}`;
}
