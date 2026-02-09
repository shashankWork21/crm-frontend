/**
 * Frontend TypeScript Types (Generated)
 * Source: crm/backend/prisma/schema.prisma
 * Last Updated: 2026-02-09
 *
 * DO NOT EDIT MANUALLY.
 */

// ============================================================================
// ENUMS
// ============================================================================

export enum MessageStatus {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ",
  FAILED = "FAILED",
}

export enum Platform {
  INSTAGRAM = "INSTAGRAM",
  WHATSAPP = "WHATSAPP",
  EMAIL = "EMAIL",
  SMS = "SMS",
}

export enum ChatSource {
  INSTAGRAM = "INSTAGRAM",
  WHATSAPP = "WHATSAPP",
  EMAIL = "EMAIL",
  SMS = "SMS",
  OTHER = "OTHER",
}

export enum DealStage {
  DISCOVERY = "DISCOVERY",
  QUALIFICATION = "QUALIFICATION",
  PROPOSAL = "PROPOSAL",
  NEGOTIATION = "NEGOTIATION",
  CLOSING = "CLOSING",
  WON = "WON",
  LOST = "LOST",
  ON_HOLD = "ON_HOLD",
  WORK_IN_PROGRESS = "WORK_IN_PROGRESS",
  DORMANT = "DORMANT",
  IN_REVIEW = "IN_REVIEW",
  IN_EXTERNAL_REVIEW = "IN_EXTERNAL_REVIEW",
  IMPLEMENTING_FEEDBACK = "IMPLEMENTING_FEEDBACK",
  DELIVERED = "DELIVERED",
  VOIDED = "VOIDED",
}

export enum DealPhase {
  QUALIFICATION = "QUALIFICATION",
  DEVELOPMENT = "DEVELOPMENT",
  CLOSURE = "CLOSURE",
  DELIVERY = "DELIVERY",
}

export enum NoteCategory {
  CALL = "CALL",
  CONTACT = "CONTACT",
  ENQUIRY = "ENQUIRY",
  QUOTATION = "QUOTATION",
  PURCHASE = "PURCHASE",
  MISCELLANEOUS = "MISCELLANEOUS",
}

export enum Role {
  REVIEWER = "REVIEWER",
  EMPLOYEE = "EMPLOYEE",
  ORGANISATION_ADMIN = "ORGANISATION_ADMIN",
  PLATFORM_ADMIN = "PLATFORM_ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export enum Scope {
  GOOGLE_CALENDAR = "GOOGLE_CALENDAR",
  GOOGLE_YOUTUBE = "GOOGLE_YOUTUBE",
  GOOGLE_EMAIL = "GOOGLE_EMAIL",
  GOOGLE_PROFILE = "GOOGLE_PROFILE",
  GOOGLE_OPENID = "GOOGLE_OPENID",
  GOOGLE_SHEETS = "GOOGLE_SHEETS",
  GOOGLE_DOCS = "GOOGLE_DOCS",
  GOOGLE_DRIVE = "GOOGLE_DRIVE",
  GOOGLE_FORMS = "GOOGLE_FORMS",
  META_INSTAGRAM_DM = "META_INSTAGRAM_DM",
  META_INSTAGRAM_BASIC = "META_INSTAGRAM_BASIC",
  META_INSTAGRAM_COMMENT = "META_INSTAGRAM_COMMENT",
}

export enum LeadSegment {
  HOT = "HOT",
  WARM = "WARM",
  COLD = "COLD",
}

export enum ContactStage {
  LEAD = "LEAD",
  PROSPECT = "PROSPECT",
  CONTACTED = "CONTACTED",
  ENGAGED = "ENGAGED",
  NURTURING = "NURTURING",
  QUALIFYING = "QUALIFYING",
  QUALIFIED = "QUALIFIED",
  UNQUALIFIED = "UNQUALIFIED",
  DISCOVERY = "DISCOVERY",
  DEMO_SCHEDULED = "DEMO_SCHEDULED",
  DEMO_COMPLETED = "DEMO_COMPLETED",
  PROPOSAL_SENT = "PROPOSAL_SENT",
  PROPOSAL_REVIEWED = "PROPOSAL_REVIEWED",
  NEGOTIATION = "NEGOTIATION",
  DECISION_PENDING = "DECISION_PENDING",
  APPROVAL_NEEDED = "APPROVAL_NEEDED",
  WON = "WON",
  LOST = "LOST",
  CUSTOMER = "CUSTOMER",
  UPSELL = "UPSELL",
  RENEWAL = "RENEWAL",
  ON_HOLD = "ON_HOLD",
  UNRESPONSIVE = "UNRESPONSIVE",
  DORMANT = "DORMANT",
  CHURNED = "CHURNED",
  REFERRAL_SOURCE = "REFERRAL_SOURCE",
  PARTNER = "PARTNER",
  DISQUALIFIED = "DISQUALIFIED",
}

export enum ContactPhase {
  INITIAL_AWARENESS = "INITIAL_AWARENESS",
  ENGAGEMENT = "ENGAGEMENT",
  QUALIFICATION = "QUALIFICATION",
  SALES_PROCESS = "SALES_PROCESS",
  DECISION = "DECISION",
  CLOSURE = "CLOSURE",
  ONGOING_RELATIONSHIP = "ONGOING_RELATIONSHIP",
  INACTIVE = "INACTIVE",
  SPECIAL = "SPECIAL",
}

export enum TagType {
  ORGANISATION = "ORGANISATION",
  CONTACT = "CONTACT",
  ACTIVITY = "ACTIVITY",
  DEAL = "DEAL",
  AUTOMATION = "AUTOMATION",
  CHAT = "CHAT",
  MESSAGE = "MESSAGE",
}

export enum ScheduleType {
  ONE_TIME = "ONE_TIME",
  RECURRING = "RECURRING",
}

export enum ActivityEnactor {
  USER = "USER",
  CONTACT = "CONTACT",
  SYSTEM = "SYSTEM",
}

export enum ReminderType {
  ONE_TIME = "ONE_TIME",
  RECURRING = "RECURRING",
  FOLLOW_UP = "FOLLOW_UP",
  DEADLINE = "DEADLINE",
}

export enum ReminderStatus {
  PENDING = "PENDING",
  DUE = "DUE",
  OVERDUE = "OVERDUE",
  COMPLETED = "COMPLETED",
  SNOOZED = "SNOOZED",
  CANCELLED = "CANCELLED",
}

export enum ReminderPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum ContactChannel {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  WHATSAPP = "WHATSAPP",
  INSTAGRAM = "INSTAGRAM",
}

export enum PaymentAction {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

export enum OrderStatus {
  CREATED = "CREATED",
  CANCELLED = "CANCELLED",
  PAID = "PAID",
  REFUNDED = "REFUNDED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export enum GroupType {
  GEOGRAPHIC = "GEOGRAPHIC",
  ORGANISATIONAL = "ORGANISATIONAL",
  CONTACT_SEGMENT = "CONTACT_SEGMENT",
}

export enum SubscriptionStatus {
  TRIAL = "TRIAL",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export enum ChatImportance {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum SubscriptionFrequency {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export enum TaskStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  COMPLETED = "COMPLETED",
  ON_HOLD = "ON_HOLD",
  CANCELLED = "CANCELLED",
}

export enum BusinessModel {
  B2B = "B2B",
  B2C = "B2C",
  B2G = "B2G",
  D2C = "D2C",
}

export enum TriggerSource {
  COMMENT = "COMMENT",
  STORY = "STORY",
  MESSAGE = "MESSAGE",
  REPLY = "REPLY",
  LEAD_NURTURE = "LEAD_NURTURE",
}

export enum ReminderChannel {
  DASHBOARD = "DASHBOARD",
  EMAIL = "EMAIL",
}

export enum TriggerType {
  COMMENT_KEYWORD = "COMMENT_KEYWORD",
  COMMENT_ANY = "COMMENT_ANY",
  MESSAGE_KEYWORD = "MESSAGE_KEYWORD",
  MESSAGE_ANY = "MESSAGE_ANY",
  TIME_DELAY = "TIME_DELAY",
}

export enum ResponseType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  FILE = "FILE",
}

export enum EmployeeAccess {
  CONTACTS_READ = "CONTACTS_READ",
  CONTACTS_WRITE = "CONTACTS_WRITE",
  DEALS_READ = "DEALS_READ",
  DEALS_WRITE = "DEALS_WRITE",
  ACTIVITIES_READ = "ACTIVITIES_READ",
  ACTIVITIES_WRITE = "ACTIVITIES_WRITE",
  NOTES_READ = "NOTES_READ",
  NOTES_WRITE = "NOTES_WRITE",
  REMINDERS_READ = "REMINDERS_READ",
  REMINDERS_WRITE = "REMINDERS_WRITE",
  TASKS_READ = "TASKS_READ",
  TASKS_WRITE = "TASKS_WRITE",
  SCHEDULES_READ = "SCHEDULES_READ",
  SCHEDULES_WRITE = "SCHEDULES_WRITE",
  AUTOMATIONS_READ = "AUTOMATIONS_READ",
  AUTOMATIONS_WRITE = "AUTOMATIONS_WRITE",
  MESSAGES_READ = "MESSAGES_READ",
  MESSAGES_WRITE = "MESSAGES_WRITE",
  LEADMAGNETS_READ = "LEADMAGNETS_READ",
  LEADMAGNETS_WRITE = "LEADMAGNETS_WRITE",
}

export enum Model {
  DEAL = "DEAL",
  CONTACT = "CONTACT",
  ORGANISATION = "ORGANISATION",
  ACTIVITY = "ACTIVITY",
  REMINDER = "REMINDER",
  MESSAGE_AUTOMATION = "MESSAGE_AUTOMATION",
  LEAD_MAGNET = "LEAD_MAGNET",
  TASK = "TASK",
  NOTE = "NOTE",
}

export enum Currency {
  INR = "INR",
  USD = "USD",
  AED = "AED",
  EUR = "EUR",
}

export enum ResponseSource {
  COMMENT_REPLY = "COMMENT_REPLY",
  INSTAGRAM_DM = "INSTAGRAM_DM",
  WHATSAPP_DM = "WHATSAPP_DM",
  EMAIL = "EMAIL",
}

export enum ExecutionStatus {
  SCHEDULED = "SCHEDULED",
  AWAITING_RESPONSE = "AWAITING_RESPONSE",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum OfferType {
  PRODUCT = "PRODUCT",
  SERVICE = "SERVICE",
}

export enum MessageSender {
  USER = "USER",
  AUTOMATION = "AUTOMATION",
  CONTACT = "CONTACT",
}

export enum MessageDirection {
  INBOUND = "INBOUND",
  OUTBOUND = "OUTBOUND",
}

export enum LeadMagnetField {
  NAME = "NAME",
  EMAIL = "EMAIL",
  PHONE_NUMBER = "PHONE_NUMBER",
}

// ============================================================================
// MODELS
// ============================================================================

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
  instagramId?: string | null;
  appScopedInstagramId?: string | null;
  addedActivities: Activity[];
  sessions: Session[];
  tokens: Token[];
  contactFollowUps: Contact[];
  createdNotes: Note[];
  contactStageChange: ContactStageChange[];
  createdReminders: Reminder[];
  assignedReminders: Reminder[];
  primaryDeals: Deal[];
  teamDeals: Deal[];
  DealStageHistory: DealStageHistory[];
  orders: Order[];
  groups: Group[];
  leadMagnets: LeadMagnet[];
  assignedTasks: Task[];
  automations: Automation[];
  employeeAccess: EmployeeAccess[];
  filterViews: FilterView[];
  offers: Offer[];
  chats: Chat[];
  primaryChats: Chat[];
}

export interface Session {
  id: string;
  userId: string;
  user: User;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Token {
  id: string;
  userId: string;
  platform: Platform;
  user: User;
  organisationId: string;
  organisation: Organisation;
  scopes: Scope[];
  accessToken: string;
  refreshToken?: string | null;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string | null;
}

export interface City {
  id: string;
  name: string;
  isProminent: boolean;
  stateId: string;
  state: State;
  createdAt: string;
  updatedAt: string;
  organisations: Organisation[];
  contacts: Contact[];
  groupEntities: GroupEntity[];
  group?: Group | null;
  groupId?: string | null;
}

export interface State {
  id: string;
  name: string;
  countryId: string;
  country: Country;
  createdAt: string;
  updatedAt: string;
  cities: City[];
  groupId?: string | null;
  group?: Group | null;
  GroupEntity: GroupEntity[];
}

export interface Country {
  id: string;
  name: string;
  code?: string | null;
  createdAt: string;
  updatedAt: string;
  states: State[];
  groupId?: string | null;
  group?: Group | null;
  GroupEntity: GroupEntity[];
}

export interface Schedule {
  id: string;
  type: ScheduleType;
  cronExpression: string;
  customDates: string[];
  startDate?: string | null;
  endDate?: string | null;
  occurrences?: number | null;
  timezone: string;
  isActive: boolean;
  description?: string | null;
  lastRun?: string | null;
  nextRun?: string | null;
  runCount: number;
  organisationId: string;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
  reminders: Reminder[];
  automations: Automation[];
}

export interface Organisation {
  id: string;
  name: string;
  legalName?: string | null;
  website?: string | null;
  team: User[];
  address?: string | null;
  cityId: string;
  city: City;
  postalCode?: string | null;
  landlineNumber?: string | null;
  createdAt: string;
  updatedAt: string;
  GSTNumber?: string | null;
  businessDescription?: string | null;
  businessModel?: BusinessModel | null;
  tags: Tag[];
  contactOrganisations: Organisation[];
  contactOrgId?: string | null;
  contactOrganisation?: Organisation | null;
  createdTags: Tag[];
  contacts: Contact[];
  orgContacts: Contact[];
  createdSchedules: Schedule[];
  Deal: Deal[];
  subscriptions: Subscription[];
  orders: Order[];
  createdGroups: Group[];
  createdLeadMagnets: LeadMagnet[];
  aiTokensTotal: number;
  aiTokensUsed: number;
  tasks: Task[];
  groupEntities: GroupEntity[];
  chats: Chat[];
  automations: Automation[];
  filterViews: FilterView[];
  offers: Offer[];
  tokens: Token[];
}

export interface Tag {
  id: string;
  title: string;
  description?: string | null;
  tagType: TagType;
  createdOrganisationId: string;
  createdOrganisation: Organisation;
  organisations: Organisation[];
  createdAt: string;
  updatedAt: string;
  activities: Activity[];
  contacts: Contact[];
  deals: Deal[];
  chats: Chat[];
  automations: Automation[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  contacts: Contact[];
  enactor: ActivityEnactor;
  enactorId: string;
  ownerId: string;
  owner: User;
  createdAt: string;
  updatedAt: string;
  Deal?: Deal | null;
  dealId?: string | null;
  taskId?: string | null;
  task?: Task | null;
}

export interface Note {
  id: string;
  title: string;
  description: string;
  category: NoteCategory;
  createdAt: string;
  updatedAt: string;
  contactId: string;
  contact: Contact;
  createdById: string;
  createdBy: User;
}

export interface Contact {
  id: string;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  dateOfBirth?: string | null;
  cityId?: string | null;
  city?: City | null;
  isPoc: boolean;
  instagramDpUrl?: string | null;
  gender?: Gender | null;
  isDeleted: boolean;
  isInbound: boolean;
  instagramId?: string | null;
  instagramHandle?: string | null;
  linkedInHandle?: string | null;
  twitterHandle?: string | null;
  alternateNumber?: string | null;
  organisationId?: string | null;
  organisation?: Organisation | null;
  contactPhase: ContactPhase;
  contactStage: ContactStage;
  assignedToId?: string | null;
  assignedTo?: User | null;
  createdAt: string;
  updatedAt: string;
  activities: Activity[];
  notes: Note[];
  tags: Tag[];
  stageHistory: ContactStageChange[];
  contactOrgId?: string | null;
  contactOrg?: Organisation | null;
  score?: number | null;
  leadSegment?: LeadSegment | null;
  leadSource?: string | null;
  leadSourceDetail?: string | null;
  lastContactedAt?: string | null;
  probability?: number | null;
  estimatedValue?: string | null;
  timezone?: string | null;
  preferredContactMethods: ContactChannel[];
  leadMagnets: LeadMagnet[];
  convertedAt?: string | null;
  lostAt?: string | null;
  lostReason?: string | null;
  Reminder: Reminder[];
  deals: Deal[];
  contactDeals: Deal[];
  tasks: Task[];
  groupEntities: GroupEntity[];
  chats: Chat[];
}

export interface ContactStageChange {
  id: string;
  contactId: string;
  contact: Contact;
  fromStage?: ContactStage | null;
  toStage: ContactStage;
  fromPhase?: ContactPhase | null;
  toPhase: ContactPhase;
  reason?: string | null;
  changedById: string;
  changedBy: User;
  createdAt: string;
  updatedAt: string;
}

export interface Reminder {
  id: string;
  title: string;
  description?: string | null;
  priority: ReminderPriority;
  reminderType: ReminderType;
  dueAt: string;
  scheduleId?: string | null;
  schedule?: Schedule | null;
  channel: ReminderChannel;
  contactId?: string | null;
  contact?: Contact | null;
  createdById: string;
  createdBy: User;
  assignedToId?: string | null;
  assignedTo?: User | null;
  status: ReminderStatus;
  completedAt?: string | null;
  snoozedUntil?: string | null;
  lastTriggeredAt?: string | null;
  triggerCount: number;
  createdAt: string;
  updatedAt: string;
  Deal?: Deal | null;
  dealId?: string | null;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  frequency: SubscriptionFrequency;
  description?: string | null;
  currency: Currency;
  razorpayPlanId?: string | null;
  baseAmount: string;
  baseSeatCount: number;
  additionalSeatPrice: string;
  freeAiTokenCount: number;
  createdAt: string;
  updatedAt: string;
  subscriptions: Subscription[];
  relatedPlanId?: string | null;
  relatedPlan?: SubscriptionPlan | null;
  relatedPlans: SubscriptionPlan[];
}

export interface Subscription {
  id: string;
  organisationId: string;
  organisation: Organisation;
  planId: string;
  plan: SubscriptionPlan;
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  razorpaySubscriptionId?: string | null;
  seatsPurchased: number;
  createdAt: string;
  updatedAt: string;
  payments: Payment[];
}

export interface Order {
  id: string;
  amount: string;
  amountDue?: string | null;
  amountPaid?: string | null;
  currency: Currency;
  razorpayOrderId?: string | null;
  razorpayOrderStatus?: string | null;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  organisationId: string;
  organisation: Organisation;
  userId: string;
  user: User;
  offerId?: string | null;
  offer?: Offer | null;
  Payment: Payment[];
  aiTokensPurchased?: number | null;
}

export interface Payment {
  id: string;
  razorpayPaymentId?: string | null;
  razorpayOrderId?: string | null;
  amount: string;
  action: PaymentAction;
  currency: Currency;
  status: string;
  createdAt: string;
  updatedAt: string;
  orderId?: string | null;
  order?: Order | null;
  subscriptionId?: string | null;
  subscription?: Subscription | null;
}

export interface Deal {
  id: string;
  title: string;
  description?: string | null;
  value?: string | null;
  currency: Currency;
  probability?: number | null;
  offerId?: string | null;
  offer?: Offer | null;
  stage: DealStage;
  phase: DealPhase;
  expectedCloseDate?: string | null;
  actualCloseDate?: string | null;
  primaryContactId: string;
  primaryContact: Contact;
  contacts: Contact[];
  organisationId?: string | null;
  organisation?: Organisation | null;
  ownerId: string;
  owner: User;
  teamMembers: User[];
  source?: string | null;
  lostReason?: string | null;
  tags: Tag[];
  activities: Activity[];
  reminders: Reminder[];
  createdAt: string;
  updatedAt: string;
  DealStageHistory: DealStageHistory[];
  tasks: Task[];
  GroupEntity: GroupEntity[];
  chatId?: string | null;
  chat?: Chat | null;
}

export interface DealStageHistory {
  id: string;
  dealId: string;
  deal: Deal;
  fromStage?: DealStage | null;
  toStage: DealStage;
  fromPhase?: DealPhase | null;
  toPhase: DealPhase;
  reason?: string | null;
  changedById: string;
  changedBy: User;
  createdAt: string;
}

export interface GroupEntity {
  id: string;
  groupId: string;
  group: Group;
  type: GroupType;
  organisationId?: string | null;
  organisation?: Organisation | null;
  contactId?: string | null;
  contact?: Contact | null;
  cityId?: string | null;
  city?: City | null;
  stateId?: string | null;
  state?: State | null;
  countryId?: string | null;
  country?: Country | null;
  dealId?: string | null;
  deal?: Deal | null;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  name: string;
  type: GroupType;
  createdById: string;
  createdBy: User;
  createdOrgId: string;
  createdOrg: Organisation;
  createdAt: string;
  updatedAt: string;
  groupEntities: GroupEntity[];
  City: City[];
  State: State[];
  Country: Country[];
}

export interface LeadMagnet {
  id: string;
  title: string;
  description?: string | null;
  fileUrl: string;
  isHosted: boolean;
  organisationId: string;
  organisation: Organisation;
  createdById: string;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
  contacts: Contact[];
  automations: Automation[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate?: string | null;
  organisationId: string;
  organisation: Organisation;
  assignedToId?: string | null;
  assignedTo?: User | null;
  activityies: Activity[];
  contactId?: string | null;
  contact?: Contact | null;
  dealId?: string | null;
  deal?: Deal | null;
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  id: string;
  source: ChatSource;
  deals: Deal[];
  contactId?: string | null;
  contact?: Contact | null;
  organisationId?: string | null;
  organisation?: Organisation | null;
  messageCount: number;
  lastMessageAt?: string | null;
  createdAt: string;
  updatedAt: string;
  temperature?: number | null;
  importance?: ChatImportance | null;
  automations: Automation[];
  executions: Execution[];
  tags: Tag[];
  messages: Message[];
  primaryUserId: string;
  primaryUser: User;
  users: User[];
}

export interface Message {
  id: string;
  chatId: string;
  chat: Chat;
  sender: MessageSender;
  senderId: string;
  content: string;
  mediaUrls: string[];
  mediaTypes: string[];
  platformMessageId?: string | null;
  status: MessageStatus;
  errorMessage?: string | null;
  direction: MessageDirection;
  buttons: unknown[];
  sentAt?: string | null;
  deliveredAt?: string | null;
  readAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Automation {
  id: string;
  isActive: boolean;
  platform: Platform;
  organisationId: string;
  organisation: Organisation;
  createdById: string;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
  chats: Chat[];
  leadMagnetId?: string | null;
  leadMagnet?: LeadMagnet | null;
  assetId?: string | null;
  assetUrl?: string | null;
  triggerSource: TriggerSource;
  triggerType: TriggerType;
  triggerValues: string[];
  responseSource: ResponseSource;
  responseType: ResponseType;
  responseContent: string;
  responseButtonList: unknown[];
  timeDelay?: number | null;
  executions: Execution[];
  tags: Tag[];
  replyToComment: boolean;
  commentReplies: string[];
  verifyFollower: boolean;
  enforceFollow: boolean;
  verificationMessage?: string | null;
  verificationButtonText: string;
  scheduleId?: string | null;
  schedule?: Schedule | null;
  fieldsToCapture: LeadMagnetField[];
  trailingAutomationId?: string | null;
}

export interface Execution {
  id: string;
  automationId: string;
  automation: Automation;
  incomingText?: string | null;
  responseText?: string | null;
  chatId: string;
  chat: Chat;
  scheduledAt?: string | null;
  executedAt: string;
  status: ExecutionStatus;
  errorMessage?: string | null;
}

export interface FilterView {
  id: string;
  name: string;
  model: Model;
  displayFields: string[];
  filterCriteria: unknown;
  sortCriteria?: unknown | null;
  organisationId: string;
  organisation: Organisation;
  createdById: string;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: string;
  title: string;
  description?: string | null;
  type: OfferType;
  validFrom?: string | null;
  validTill?: string | null;
  organisationId: string;
  organisation: Organisation;
  createdById?: string | null;
  createdBy?: User | null;
  amount: string;
  currency: Currency;
  inclusions: string[];
  exclusions: string[];
  orders: Order[];
  createdAt: string;
  updatedAt: string;
  deals: Deal[];
}
