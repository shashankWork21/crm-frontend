export function schedulePathBulk() {
  return `${process.env.BACKEND_URL}/schedule/bulk`;
}

export function schedulePath() {
  return `${process.env.BACKEND_URL}/schedule`;
}

export function schedulePathById(id: string) {
  return `${process.env.BACKEND_URL}/schedule/${id}`;
}
