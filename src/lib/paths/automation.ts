export function automationPath() {
  return `${process.env.BACKEND_URL}/automations`;
}

export function automationPathById(automationId: string) {
  return `${process.env.BACKEND_URL}/automations/${automationId}`;
}

export function automationPathByLeadMagnetId(leadMagnetId: string) {
  return `${process.env.BACKEND_URL}/automations/lead-magnet/${leadMagnetId}`;
}
