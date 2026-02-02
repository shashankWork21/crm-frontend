/**
 * Frontend TypeScript Types
 * Generated from Prisma Schema
 * Last Updated: January 30, 2026
 */

// ============================================================================
// ENUMS
// ============================================================================

export enum Role {
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

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
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

export enum ContactChannel {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  WHATSAPP = "WHATSAPP",
  INSTAGRAM = "INSTAGRAM",
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

export enum TagType {
  ORGANISATION = "ORGANISATION",
  CONTACT = "CONTACT",
  ACTIVITY = "ACTIVITY",
  DEAL = "DEAL",
  AUTOMATION = "AUTOMATION",
  CHAT = "CHAT",
  MESSAGE = "MESSAGE",
}

export enum ActivityEnactor {
  USER = "USER",
  CONTACT = "CONTACT",
  SYSTEM = "SYSTEM",
}

export enum NoteCategory {
  CALL = "CALL",
  CONTACT = "CONTACT",
  ENQUIRY = "ENQUIRY",
  QUOTATION = "QUOTATION",
  PURCHASE = "PURCHASE",
  MISCELLANEOUS = "MISCELLANEOUS",
}

export enum ScheduleType {
  ONE_TIME = "ONE_TIME",
  RECURRING = "RECURRING",
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

export enum TaskStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  COMPLETED = "COMPLETED",
  ON_HOLD = "ON_HOLD",
  CANCELLED = "CANCELLED",
}

export enum GroupType {
  GEOGRAPHIC = "GEOGRAPHIC",
  ORGANISATIONAL = "ORGANISATIONAL",
  CONTACT_SEGMENT = "CONTACT_SEGMENT",
}

export enum BusinessModel {
  B2B = "B2B",
  B2C = "B2C",
  B2G = "B2G",
  D2C = "D2C",
}

export enum SubscriptionStatus {
  TRIAL = "TRIAL",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export enum SubscriptionFrequency {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
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

export enum PaymentAction {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

export enum MessageStatus {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ",
  FAILED = "FAILED",
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

export enum OfferType {
  PRODUCT = "PRODUCT",
  SERVICE = "SERVICE",
}

// ============================================================================
// BASE TYPES
// ============================================================================

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// USER & AUTHENTICATION
// ============================================================================

export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  role: Role;
  organisationId?: string;
  organisation?: Organisation;
  employeeAccess?: EmployeeAccess[];
  filterViews?: FilterView[];
  automations?: Automation[];
  sessions?: Session[];
  tokens?: Token[];
  addedActivities?: Activity[];
  createdNotes?: Note[];
  contactFollowUps?: Contact[];
  contactStageChange?: ContactStageChange[];
  createdReminders?: Reminder[];
  assignedReminders?: Reminder[];
  primaryDeals?: Deal[];
  teamDeals?: Deal[];
  dealStageHistory?: DealStageHistory[];
  orders?: Order[];
  groups?: Group[];
  leadMagnets?: LeadMagnet[];
  assignedTasks?: Task[];
  offers?: Offer[];
  chats?: Chat[];
}

export interface Session extends BaseEntity {
  userId: string;
  user?: User;
  expiresAt: string;
}

export interface Token extends BaseEntity {
  userId: string;
  user?: User;
  organisationId: string;
  organisation?: Organisation;
  platform: Platform;
  scopes: Scope[];
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  platformId?: string;
}

// ============================================================================
// GEOGRAPHY
// ============================================================================

export interface Country extends BaseEntity {
  name: string;
  code?: string;
  states?: State[];
  groupId?: string;
  group?: Group;
  groupEntities?: GroupEntity[];
}

export interface State extends BaseEntity {
  name: string;
  countryId: string;
  country?: Country;
  cities?: City[];
  groupId?: string;
  group?: Group;
  groupEntities?: GroupEntity[];
}

export interface City extends BaseEntity {
  name: string;
  isProminent: boolean;
  stateId: string;
  state?: State;
  groupId?: string;
  group?: Group;
  organisations?: Organisation[];
  contacts?: Contact[];
  groupEntities?: GroupEntity[];
}

// ============================================================================
// ORGANISATION
// ============================================================================

export interface Organisation extends BaseEntity {
  name: string;
  legalName?: string;
  website?: string;
  address?: string;
  cityId: string;
  city?: City;
  postalCode?: string;
  landlineNumber?: string;
  GSTNumber?: string;
  businessDescription?: string;
  businessModel?: BusinessModel;
  contactOrgId?: string;
  contactOrganisation?: Organisation;
  contactOrganisations?: Organisation[];
  aiTokensTotal: number;
  aiTokensUsed: number;
  team?: User[];
  tags?: Tag[];
  createdTags?: Tag[];
  contacts?: Contact[];
  orgContacts?: Contact[];
  deals?: Deal[];
  groups?: Group[];
  subscriptions?: Subscription[];
  orders?: Order[];
  filterViews?: FilterView[];
  createdSchedules?: Schedule[];
  chats?: Chat[];
  automations?: Automation[];
  tasks?: Task[];
  groupEntities?: GroupEntity[];
  createdLeadMagnets?: LeadMagnet[];
  offers?: Offer[];
  tokens?: Token[];
}

// ============================================================================
// TAGS
// ============================================================================

export interface Tag extends BaseEntity {
  title: string;
  description?: string;
  tagType: TagType;
  createdOrganisationId: string;
  createdOrganisation?: Organisation;
  organisations?: Organisation[];
  activities?: Activity[];
  contacts?: Contact[];
  deals?: Deal[];
  chats?: Chat[];
  automations?: Automation[];
}

// ============================================================================
// CONTACTS
// ============================================================================

export interface Contact extends BaseEntity {
  name: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  cityId?: string;
  city?: City;
  isPoc: boolean;
  gender?: Gender;
  isDeleted: boolean;
  isInbound: boolean;
  instagramHandle?: string;
  linkedInHandle?: string;
  twitterHandle?: string;
  alternateNumber?: string;
  organisationId?: string;
  organisation?: Organisation;
  contactPhase: ContactPhase;
  contactStage: ContactStage;
  assignedToId?: string;
  assignedTo?: User;
  contactOrgId?: string;
  contactOrg?: Organisation;
  score?: number;
  leadSegment?: LeadSegment;
  leadSource?: string;
  leadSourceDetail?: string;
  lastContactedAt?: string;
  probability?: number;
  estimatedValue?: string;
  timezone?: string;
  preferredContactMethods?: ContactChannel[];
  leadMagnetId?: string;
  leadMagnet?: LeadMagnet;
  convertedAt?: string;
  lostAt?: string;
  lostReason?: string;
  activities?: Activity[];
  notes?: Note[];
  tags?: Tag[];
  stageHistory?: ContactStageChange[];
  reminders?: Reminder[];
  deals?: Deal[];
  contactDeals?: Deal[];
  tasks?: Task[];
  chats?: Chat[];
  groupEntities?: GroupEntity[];
}

export interface ContactStageChange extends BaseEntity {
  contactId: string;
  contact?: Contact;
  fromStage?: ContactStage;
  toStage: ContactStage;
  fromPhase?: ContactPhase;
  toPhase: ContactPhase;
  reason?: string;
  changedById: string;
  changedBy?: User;
}

// ============================================================================
// ACTIVITIES & NOTES
// ============================================================================

export interface Activity extends BaseEntity {
  title: string;
  description: string;
  enactor: ActivityEnactor;
  enactorId: string;
  ownerId: string;
  owner?: User;
  dealId?: string;
  deal?: Deal;
  taskId?: string;
  task?: Task;
  tags?: Tag[];
  contacts?: Contact[];
}

export interface Note extends BaseEntity {
  title: string;
  description: string;
  category: NoteCategory;
  contactId: string;
  contact?: Contact;
  createdById: string;
  createdBy?: User;
}

// ============================================================================
// DEALS
// ============================================================================

export interface Deal extends BaseEntity {
  title: string;
  description?: string;
  value?: string;
  currency: Currency;
  probability?: number;
  offerId?: string;
  offer?: Offer;
  stage: DealStage;
  phase: DealPhase;
  expectedCloseDate?: string;
  actualCloseDate?: string;
  primaryContactId: string;
  primaryContact?: Contact;
  contacts?: Contact[];
  organisationId?: string;
  organisation?: Organisation;
  ownerId: string;
  owner?: User;
  teamMembers?: User[];
  source?: string;
  lostReason?: string;
  tags?: Tag[];
  activities?: Activity[];
  reminders?: Reminder[];
  stageHistory?: DealStageHistory[];
  tasks?: Task[];
  groupEntities?: GroupEntity[];
  chatId?: string;
  chat?: Chat;
}

export interface DealStageHistory {
  id: string;
  dealId: string;
  deal?: Deal;
  fromStage?: DealStage;
  toStage: DealStage;
  fromPhase?: DealPhase;
  toPhase: DealPhase;
  reason?: string;
  changedById: string;
  changedBy?: User;
  createdAt: string;
}

// ============================================================================
// TASKS
// ============================================================================

export interface Task extends BaseEntity {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate?: string;
  organisationId: string;
  organisation?: Organisation;
  assignedToId?: string;
  assignedTo?: User;
  contactId?: string;
  contact?: Contact;
  dealId?: string;
  deal?: Deal;
  activities?: Activity[];
}

// ============================================================================
// REMINDERS & SCHEDULES
// ============================================================================

export interface Schedule extends BaseEntity {
  type: ScheduleType;
  cronExpression: string;
  customDates?: string[];
  startDate?: string;
  endDate?: string;
  occurrences?: number;
  timezone: string;
  isActive: boolean;
  description?: string;
  lastRun?: string;
  nextRun?: string;
  runCount: number;
  organisationId: string;
  organisation?: Organisation;
  reminders?: Reminder[];
  automations?: Automation[];
}

export interface Reminder extends BaseEntity {
  title: string;
  description?: string;
  priority: ReminderPriority;
  reminderType: ReminderType;
  dueAt: string;
  scheduleId?: string;
  schedule?: Schedule;
  channel: ReminderChannel;
  contactId?: string;
  contact?: Contact;
  dealId?: string;
  deal?: Deal;
  createdById: string;
  createdBy?: User;
  assignedToId?: string;
  assignedTo?: User;
  status: ReminderStatus;
  completedAt?: string;
  snoozedUntil?: string;
  lastTriggeredAt?: string;
  triggerCount: number;
}

// ============================================================================
// GROUPS
// ============================================================================

export interface Group extends BaseEntity {
  name: string;
  type: GroupType;
  createdById: string;
  createdBy?: User;
  createdOrgId: string;
  createdOrg?: Organisation;
  groupEntities?: GroupEntity[];
  cities?: City[];
  states?: State[];
  countries?: Country[];
}

export interface GroupEntity extends BaseEntity {
  groupId: string;
  group?: Group;
  type: GroupType;
  organisationId?: string;
  organisation?: Organisation;
  contactId?: string;
  contact?: Contact;
  cityId?: string;
  city?: City;
  stateId?: string;
  state?: State;
  countryId?: string;
  country?: Country;
  dealId?: string;
  deal?: Deal;
}

// ============================================================================
// LEAD MAGNETS
// ============================================================================

export interface LeadMagnet extends BaseEntity {
  title: string;
  description?: string;
  fileUrl: string;
  isHosted: boolean;
  organisationId: string;
  organisation?: Organisation;
  createdById: string;
  createdBy?: User;
  contacts?: Contact[];
  automations?: Automation[];
}

// ============================================================================
// SUBSCRIPTIONS & PAYMENTS
// ============================================================================

export interface SubscriptionPlan extends BaseEntity {
  name: string;
  frequency: SubscriptionFrequency;
  description?: string;
  currency: Currency;
  razorpayPlanId?: string;
  baseAmount: string;
  baseSeatCount: number;
  additionalSeatPrice: string;
  freeAiTokenCount: number;
  relatedPlanId?: string;
  relatedPlan?: SubscriptionPlan;
  relatedPlans?: SubscriptionPlan[];
  subscriptions?: Subscription[];
}

export interface Subscription extends BaseEntity {
  organisationId: string;
  organisation?: Organisation;
  planId: string;
  plan?: SubscriptionPlan;
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  razorpaySubscriptionId?: string;
  seatsPurchased: number;
  payments?: Payment[];
}

export interface Order extends BaseEntity {
  amount: string;
  amountDue?: string;
  amountPaid?: string;
  currency: Currency;
  razorpayOrderId?: string;
  razorpayOrderStatus?: string;
  status: OrderStatus;
  organisationId: string;
  organisation?: Organisation;
  userId: string;
  user?: User;
  offerId?: string;
  offer?: Offer;
  aiTokensPurchased?: number;
  payments?: Payment[];
}

export interface Payment extends BaseEntity {
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  amount: string;
  action: PaymentAction;
  currency: Currency;
  status: string;
  orderId?: string;
  order?: Order;
  subscriptionId?: string;
  subscription?: Subscription;
}

// ============================================================================
// OFFERS
// ============================================================================

export interface Offer extends BaseEntity {
  title: string;
  description?: string;
  type: OfferType;
  validFrom?: string;
  validTill?: string;
  organisationId: string;
  organisation?: Organisation;
  createdById?: string;
  createdBy?: User;
  amount: string;
  currency: Currency;
  inclusions: string[];
  exclusions: string[];
  orders?: Order[];
  deals?: Deal[];
}

// ============================================================================
// MESSAGING & AUTOMATION
// ============================================================================

export interface Chat extends BaseEntity {
  source: ChatSource;
  sourceChatId: string;
  sourceUserId: string;
  sourceUserName?: string;
  contactId?: string;
  contact?: Contact;
  organisationId?: string;
  organisation?: Organisation;
  messageCount: number;
  lastMessageAt?: string;
  deals?: Deal[];
  automations?: Automation[];
  executions?: Execution[];
  tags?: Tag[];
  messages?: Message[];
  users?: User[];
}

export interface Message extends BaseEntity {
  chatId: string;
  chat?: Chat;
  sender: MessageSender;
  senderId: string;
  content: string;
  mediaUrls: string[];
  mediaTypes: string[];
  platformMessageId?: string;
  status: MessageStatus;
  errorMessage?: string;
  direction: MessageDirection;
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
}

export interface Automation extends BaseEntity {
  name: string;
  isActive: boolean;
  platform: Platform;
  organisationId: string;
  organisation?: Organisation;
  createdById: string;
  createdBy?: User;
  leadMagnetId?: string;
  leadMagnet?: LeadMagnet;
  assetId?: string;
  assetUrl?: string;
  triggerSource: TriggerSource;
  triggerType: TriggerType;
  triggerValues: string[];
  responseSource: ResponseSource;
  responseType: ResponseType;
  responseContent: string;
  responseButtonTextList: string[];
  timeDelay?: number;
  replyToComment: boolean;
  commentReplies: string[];
  verifyFollower: boolean;
  enforceFollow: boolean;
  verificationMessage?: string;
  verificationButtonText: string;
  chats?: Chat[];
  executions?: Execution[];
  tags?: Tag[];
  scheduleId?: string;
  schedule?: Schedule;
}

export interface Execution {
  id: string;
  automationId: string;
  automation?: Automation;
  incomingText?: string;
  responseText?: string;
  chatId: string;
  chat?: Chat;
  scheduledAt?: string;
  executedAt: string;
  status: ExecutionStatus;
  errorMessage?: string;
}

// ============================================================================
// FILTER VIEWS
// ============================================================================

export interface FilterView extends BaseEntity {
  name: string;
  model: Model;
  displayFields: string[];
  filterCriteria: Record<string, unknown>;
  sortCriteria?: Array<{
    field: string;
    order: "asc" | "desc";
  }> | null;
  organisationId: string;
  organisation?: Organisation;
  createdById: string;
  createdBy?: User;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  errors: string | string[];
  statusCode: number;
  message?: string;
}

// ============================================================================
// FILTER & QUERY TYPES
// ============================================================================

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ContactFilters extends PaginationParams {
  stage?: ContactStage;
  phase?: ContactPhase;
  segment?: LeadSegment;
  assignedToId?: string;
  organisationId?: string;
  cityId?: string;
  leadSource?: string;
  tags?: string[];
  search?: string;
  dateRange?: DateRange;
}

export interface DealFilters extends PaginationParams {
  stage?: DealStage;
  phase?: DealPhase;
  ownerId?: string;
  organisationId?: string;
  minValue?: number;
  maxValue?: number;
  tags?: string[];
  search?: string;
  dateRange?: DateRange;
}

export interface TaskFilters extends PaginationParams {
  status?: TaskStatus;
  assignedToId?: string;
  organisationId?: string;
  contactId?: string;
  dealId?: string;
  overdue?: boolean;
  dateRange?: DateRange;
}

export interface ReminderFilters extends PaginationParams {
  status?: ReminderStatus;
  priority?: ReminderPriority;
  reminderType?: ReminderType;
  assignedToId?: string;
  contactId?: string;
  dealId?: string;
  dateRange?: DateRange;
}

export interface ActivityFilters extends PaginationParams {
  enactor?: ActivityEnactor;
  ownerId?: string;
  contactIds?: string[];
  dealId?: string;
  taskId?: string;
  tags?: string[];
  dateRange?: DateRange;
}

export interface ChatFilters extends PaginationParams {
  source?: ChatSource;
  contactId?: string;
  organisationId?: string;
  dateRange?: DateRange;
}

export interface MessageFilters extends PaginationParams {
  chatId?: string;
  sender?: MessageSender;
  senderId?: string;
  status?: MessageStatus;
  direction?: MessageDirection;
  dateRange?: DateRange;
}

export interface ExecutionFilters extends PaginationParams {
  status?: ExecutionStatus;
  chatId?: string;
  automationId?: string;
  dateRange?: DateRange;
}

export interface ScheduleFilters extends PaginationParams {
  type?: ScheduleType;
  isActive?: boolean;
  organisationId?: string;
  dateRange?: DateRange;
}

export interface AutomationFilters extends PaginationParams {
  platform?: Platform;
  triggerType?: TriggerType;
  triggerSource?: TriggerSource;
  isActive?: boolean;
  organisationId?: string;
  dateRange?: DateRange;
}

// ============================================================================
// STATISTICS & ANALYTICS TYPES
// ============================================================================

export interface ContactStatistics {
  total: number;
  byStage: Record<ContactStage, number>;
  byPhase: Record<ContactPhase, number>;
  bySegment: Record<LeadSegment, number>;
  newThisMonth: number;
  convertedThisMonth: number;
  conversionRate: number;
}

export interface DealStatistics {
  total: number;
  totalValue: string;
  byStage: Record<DealStage, number>;
  byPhase: Record<DealPhase, number>;
  averageValue: string;
  averageProbability: number;
  wonThisMonth: number;
  lostThisMonth: number;
  winRate: number;
}

export interface OrganisationStatistics {
  totalContacts: number;
  totalDeals: number;
  totalRevenue: string;
  activeUsers: number;
  aiTokensRemaining: number;
  aiTokensUsagePercentage: number;
}

export interface AutomationStatistics {
  totalAutomations: number;
  activeAutomations: number;
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  successRate: number;
  executionsBySource: Record<TriggerSource, number>;
  executionsByType: Record<ResponseType, number>;
}

export interface MessageStatistics {
  totalMessages: number;
  byStatus: Record<MessageStatus, number>;
  byDirection: Record<MessageDirection, number>;
  bySender: Record<MessageSender, number>;
  sentThisMonth: number;
  deliveredThisMonth: number;
  failedThisMonth: number;
}

// ============================================================================
// FORM & UI TYPES
// ============================================================================

export interface FormState {
  success: boolean;
  message: string;
  errors: {
    [key: string]: string[];
  };
  itemId?: string;
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

// ============================================================================
// EXTERNAL INTEGRATIONS
// ============================================================================

export interface InstagramMedia {
  caption: string;
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
  alt_text: string;
}
