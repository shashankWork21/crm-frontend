import { TriggerType } from "../types";

export interface TriggerTypeOption {
  label: string;
  value: TriggerType;
}

export const triggerTypeOptions: TriggerTypeOption[] = [
  {
    label: "When someone comments with any text",
    value: TriggerType.COMMENT_ANY,
  },
  {
    label: "When someone comments with specific keywords",
    value: TriggerType.COMMENT_KEYWORD,
  },
  {
    label: "When someone sends any message",
    value: TriggerType.MESSAGE_ANY,
  },
  {
    label: "When someone sends a message with specific keywords",
    value: TriggerType.MESSAGE_KEYWORD,
  },
  {
    label: "After a specific time delay",
    value: TriggerType.TIME_DELAY,
  },
];
