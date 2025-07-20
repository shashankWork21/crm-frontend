export enum Role {
  EMPLOYEE = "EMPLOYEE",
  ADMIN = "ADMIN",
}

export enum Scope {
  CALENDAR = "CALENDAR",
  YOUTUBE = "YOUTUBE",
  EMAIL = "EMAIL",
  PROFILE = "PROFILE",
  OPENID = "OPENID",
  SHEETS = "SHEETS",
  DOCS = "DOCS",
}

export enum ContactType {
  LEAD = "LEAD",
  PROSPECT = "PROSPECT",
  CUSTOMER = "CUSTOMER",
}

export enum LeadSegment {
  HOT = "HOT",
  WARM = "WARM",
  COLD = "COLD",
}

export enum NoteCategory {
  CALL = "CALL",
  CONTACT = "CONTACT",
  ENQUIRY = "ENQUIRY",
  QUOTATION = "QUOTATION",
  PURCHASE = "PURCHASE",
  MISCELLANEOUS = "MISCELLANEOUS",
}

export enum BranchType {
  HEADQUARTERS = "HEADQUARTERS",
  BRANCH = "BRANCH",
}

export enum TagType {
  ORGANISATION = "ORGANISATION",
  CONTACT = "CONTACT",
  ACTIVITY = "ACTIVITY",
}

export enum ActivityType {
  ENQUIRY = "ENQUIRY",
  QUOTATION_REQUEST = "QUOTATION_REQUEST",
  PURCHASE_ORDER = "PURCHASE_ORDER",
  INVOICE = "INVOICE",
  PAYMENT = "PAYMENT",
  DELIVERY = "DELIVERY",
  RETURN = "RETURN",
  COMPLAINT = "COMPLAINT",
  MISCELLANEOUS = "MISCELLANEOUS",
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  countryCode: string;
  phoneNumber: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  organisationId?: string | null;
  organisation?: Organisation | null;
  addedActivities?: Activity[];
  sessions?: Session[];
  tokens?: Token[];
  contactFollowUps?: Contact[];
  createdNotes?: Note[];
  activityFollowUps?: Activity[];
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  tokens?: Token[];
}

export interface Token {
  id: string;
  userId: string;
  sessionId: string;
  scopes: Scope[];
  accessToken: string;
  refreshToken?: string | null;
  createdAt: string;
  updatedAt: string;
  session?: Session;
  user?: User;
}

export interface Region {
  id: string;
  name: string;
  state: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  branches?: Branch[];
  schedules?: Schedule[];
}

export interface Schedule {
  id: string;
  regionId: string;
  dayOfMonth: number;
  createdOrgId: string;
  createdAt: string;
  updatedAt: string;
  region?: Region;
  createdOrg?: Organisation;
}

export interface Branch {
  id: string;
  address?: string | null;
  city: string;
  postalCode?: string | null;
  landlineNumber?: string | null;
  regionId: string;
  createdAt: string;
  updatedAt: string;
  organisationId: string;
  type: BranchType;
  region?: Region;
  organisation?: Organisation;
  contacts?: Contact[];
  pointOfContactId?: string | null;
  pointOfContact?: Contact | null;
}

export interface Organisation {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  team?: User[];
  branches?: Branch[];
  tags?: Tag[];
  contactOrganisations?: Organisation[];
  contactOrgId?: string | null;
  contactOrganisation?: Organisation | null;
  createdTags?: Tag[];
  contacts?: Contact[];
  createdSchedule?: Schedule[];
}

export interface Tag {
  id: string;
  title: string;
  description?: string | null;
  tagType: TagType;
  createdOrganisationId: string;
  createdAt: string;
  updatedAt: string;
  createdOrganisation?: Organisation;
  organisations?: Organisation[];
  activities?: Activity[];
  contacts?: Contact[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  addedById: string;
  needFollowUp: boolean;
  createdAt: string;
  updatedAt: string;
  type: ActivityType;
  contactId: string;
  followUpDate?: string | null;
  assignedToId?: string | null;
  followUpActivityId?: string | null;
  addedBy?: User;
  tags?: Tag[];
  contact?: Contact;
  assignedTo?: User | null;
  followUpActivity?: Activity | null;
  followUpActivities?: Activity[];
}

export interface Note {
  id: string;
  title: string;
  description: string;
  category: NoteCategory;
  createdAt: string;
  updatedAt: string;
  contactId: string;
  createdById: string;
  contact?: Contact;
  createdBy?: User;
}

export interface Contact {
  id: string;
  name: string;
  email?: string | null;
  phoneNumber: string;
  alternateNumber?: string | null;
  branchId?: string | null;
  contactType: ContactType;
  leadSegment?: LeadSegment | null;
  leadScore?: number | null;
  followUpFrequency?: number | null;
  followUpOn?: string | null;
  assignedToId?: string | null;
  createdAt: string;
  updatedAt: string;
  branch?: Branch | null;
  assignedTo?: User | null;
  pocBranch?: Branch | null;
  activities?: Activity[];
  notes?: Note[];
  tags?: Tag[];
  contactOrgId: string;
  contactOrg?: Organisation;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
  statusCode: number;
}

export interface FormState {
  success: boolean;
  message: string;
  errors: {
    [key: string]: string[];
  };
}

export interface DeleteFormProps {
  setOpen: (open: boolean) => void;
  id: string;
  successCallback?: () => void;
}

export enum DashboardContactView {
  REGION_FOLLOW_UPS = "REGION_FOLLOW_UPS",
  UPCOMING_FOLLOWUPS = "UPCOMING_FOLLOW_UPS",
  OVERDUE_FOLLOWUPS = "OVERDUE_FOLLOW_UPS",
}

export enum DateOptions {
  TODAY = "TODAY",
  TOMORROW = "TOMORROW",
  CUSTOM = "CUSTOM",
}
