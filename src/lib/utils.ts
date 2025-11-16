import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toTitleCase = (str: string): string => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
};

export function handleFieldToggle(prev: string, field: string) {
  if (!prev) {
    return field;
  } else if (prev.includes(field)) {
    return prev
      .split(",")
      .filter((f) => f !== field)
      .join(",");
  } else {
    return `${prev},${field}`;
  }
}
