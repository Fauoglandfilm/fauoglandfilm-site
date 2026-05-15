export const MARKETPLACE_MODERATION_STATUSES = ["pending", "approved", "rejected", "hidden"] as const;
export const PUBLIC_VISIBILITY_STATUSES = ["private", "public"] as const;
export const AVAILABILITY_STATUSES = ["available", "busy", "hidden"] as const;
export const JOB_STATUSES = ["draft", "open", "filled", "closed", "archived"] as const;
export const APPLICATION_STATUSES = ["interested", "contacted", "shortlisted", "declined", "hired"] as const;
export const CONTACT_REQUEST_STATUSES = ["pending", "accepted", "declined"] as const;
export const TIMESHEET_STATUSES = ["draft", "exported", "sent"] as const;
export const RATE_UNITS = ["hour", "day", "project"] as const;

export const DEFAULT_MARKETPLACE_PAGE_SIZE = 24;
export const MAX_MARKETPLACE_PAGE_SIZE = 60;
export const MAX_PORTFOLIO_LINKS = 8;
export const MAX_TIMESHEET_ENTRIES = 120;
