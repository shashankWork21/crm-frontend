export interface FieldSchema {
  label: string;
  name: string;
  type: string;
  composite: boolean;
  searchFields?: string[];
  displayField?: string;
}

export const contactFieldSchema: FieldSchema[] = [
  {
    label: "Name",
    name: "name",
    type: "string",
    composite: false,
  },
  {
    label: "Email",
    name: "email",
    type: "string",
    composite: false,
  },
  {
    label: "Phone Number",
    name: "phoneNumber",
    type: "string",
    composite: false,
  },
  {
    label: "Date of Birth",
    name: "dateOfBirth",
    type: "date-string",
    composite: false,
  },
  {
    label: "City",
    name: "city",
    type: "model",
    composite: true,
    searchFields: ["name"],
    displayField: "name",
  },
  {
    label: "Is POC",
    name: "isPoc",
    type: "boolean",
    composite: false,
  },
  {
    label: "Gender",
    name: "gender",
    type: "enum",
    composite: false,
  },
  {
    label: "Is Inbound",
    name: "isInbound",
    type: "boolean",
    composite: false,
  },
  {
    label: "Alternate Number",
    name: "alternateNumber",
    type: "string",
    composite: false,
  },
  {
    label: "Organisation",
    name: "organisation",
    type: "model",
    composite: true,
    searchFields: ["name"],
    displayField: "name",
  },
  {
    label: "Contact Phase",
    name: "contactPhase",
    type: "enum",
    composite: false,
  },
  {
    label: "Contact Stage",
    name: "contactStage",
    type: "enum",
    composite: false,
  },
  {
    label: "Assigned To",
    name: "assignedTo",
    type: "model",
    composite: true,
    searchFields: ["firstName", "lastName", "email", "phoneNumber"],
    displayField: ["firstName", "lastName"].join(" "),
  },
  {
    label: "Score",
    name: "score",
    type: "number",
    composite: false,
  },
  {
    label: "Lead Segment",
    name: "leadSegment",
    type: "enum",
    composite: false,
  },
  {
    label: "Lead Source",
    name: "leadSource",
    type: "string",
    composite: false,
  },
  {
    label: "Lead Source Detail",
    name: "leadSourceDetail",
    type: "string",
    composite: false,
  },
  {
    label: "Last Contacted At",
    name: "lastContactedAt",
    type: "date-string",
    composite: false,
  },
  {
    label: "Probability",
    name: "probability",
    type: "number",
    composite: false,
  },
  {
    label: "Estimated Value",
    name: "estimatedValue",
    type: "string",
    composite: false,
  },
  {
    label: "Preferred Contact Methods",
    name: "preferredContactMethods",
    type: "array-enum",
    composite: false,
  },
  {
    label: "Lead Magnet",
    name: "leadMagnet",
    type: "model",
    composite: true,
    searchFields: ["name", "fileUrl"],
    displayField: "name",
  },
  {
    label: "Converted At",
    name: "convertedAt",
    type: "date-string",
    composite: false,
  },
  {
    label: "Lost At",
    name: "lostAt",
    type: "date-string",
    composite: false,
  },
  {
    label: "Lost Reason",
    name: "lostReason",
    type: "string",
    composite: false,
  },
];
