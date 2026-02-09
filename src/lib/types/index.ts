export * from "./basic-types";
// ============================================================================
// API RESPONSE TYPES
// ============================================================================

import {
  ActivityEnactor,
  ChatSource,
  ContactPhase,
  ContactStage,
  DealPhase,
  DealStage,
  ExecutionStatus,
  LeadSegment,
  MessageDirection,
  MessageSender,
  MessageStatus,
  Platform,
  ReminderPriority,
  ReminderStatus,
  ReminderType,
  ScheduleType,
  TaskStatus,
  TriggerSource,
  TriggerType,
} from "./basic-types";

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
