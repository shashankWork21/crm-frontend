export function getSuffix(day: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = day % 100;
  return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
}

export function formatDate(date: string) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("default", { month: "long" });
  const year = d.getFullYear();
  return { month, day, year, suffix: getSuffix(day) };
}
