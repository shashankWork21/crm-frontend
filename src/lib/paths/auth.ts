export function registerPath(role: string) {
  return `${process.env.BACKEND_URL}/register?role=${role}`;
}

export function loginPath() {
  return `${process.env.BACKEND_URL}/login`;
}

export function logoutPath() {
  return `${process.env.BACKEND_URL}/logout`;
}

export function sessionValidatePath() {
  return `${process.env.BACKEND_URL}/sessions/validate`;
}

export function forgotPasswordPath() {
  return `${process.env.BACKEND_URL}/forgot-password`;
}

export function verifyKeyPath(key: string) {
  return `${process.env.BACKEND_URL}/verify-reset-key?key=${key}`;
}

export function resetPasswordPath() {
  return `${process.env.BACKEND_URL}/reset-password`;
}
