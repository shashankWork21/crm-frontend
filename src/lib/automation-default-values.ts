import {
  Platform,
  ResponseSource,
  ResponseType,
  TriggerSource,
  TriggerType,
} from "./types";

export const automationDefaultValues = {
  isActive: true,
  platform: Platform.INSTAGRAM,
  triggerSource: TriggerSource.COMMENT,
  triggerType: TriggerType.COMMENT_KEYWORD,
  triggerValues: ["reviewdemo"],
  responseSource: ResponseSource.INSTAGRAM_DM,
  responseType: ResponseType.TEXT,
  responseButtonList: [
    JSON.stringify({
      text: "Get me the link",
      type: "LEAD_MAGNET_URL",
    }),
  ],
  replyToComment: true,
  verifyFollower: true,
  enforceFollow: true,
};
