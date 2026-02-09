import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Scope, TriggerType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toTitleCase = (str: string): string => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
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

export const leadMagnetSteps = [
  {
    title: "Create Lead Magnet",
    description: "A resource that attracts leads into your business.",
    stepNumber: 1,
  },
  {
    title: "Distribute",
    description:
      "Set up automations to deliver your lead magnet via different channels.",
    stepNumber: 2,
  },
  {
    title: "Engage with Leads",
    description: "Nurture your new leads by interacting with them on DM.",
    stepNumber: 3,
  },
];

export const instagramScopes = [
  Scope.META_INSTAGRAM_BASIC,
  Scope.META_INSTAGRAM_COMMENT,
  Scope.META_INSTAGRAM_DM,
];

export function getTriggerTypeLabel(triggerType: TriggerType): string {
  switch (triggerType) {
    case TriggerType.COMMENT_ANY:
      return "Any Comment";
    case TriggerType.COMMENT_KEYWORD:
      return "Keyword";
    case TriggerType.MESSAGE_ANY:
      return "Any Message";
    case TriggerType.MESSAGE_KEYWORD:
      return "Message Keyword";
    case TriggerType.TIME_DELAY:
      return "Time Delay";
    default:
      return triggerType;
  }
}
