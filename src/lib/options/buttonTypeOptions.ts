// ("CAPTURE_URL" | "LEAD_MAGNET_URL" | "OTHER_URL" | "POSTBACK")

export interface ButtonTypeOption {
  label: string;
  value: "CAPTURE_URL" | "LEAD_MAGNET_URL" | "OTHER_URL" | "POSTBACK";
}

export const buttonTypeOptions = [
  {
    label:
      "Capture Contact Details (Users will see a form asking their details)",
    value: "CAPTURE_URL",
  },
  {
    label:
      "Share Lead Magnet (Users will be directed to the URL of the lead magnet)",
    value: "LEAD_MAGNET_URL",
  },
  {
    label: "Other URL (Users will be directed to a custom URL)",
    value: "OTHER_URL",
  },
  {
    label: "Quick Reply (Users will send this text back to you)",
    value: "POSTBACK",
  },
];
