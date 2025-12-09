/**
 * Application-wide constants
 */

export const APP_NAME = "AI Transfer Evaluation";
export const APP_DESCRIPTION = "Intelligent transfer credit evaluation for University of Washington";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  UPLOAD: "/upload",
  RESULTS: "/results",
  DASHBOARD: "/dashboard",
  ADVISOR_REVIEW: "/advisor-review",
} as const;

export const SUPPORTED_FILE_FORMATS = ["PDF", "JPG", "PNG"] as const;

export const MATCH_TYPES = {
  EXACT: "exact",
  SEMANTIC: "semantic",
  ELECTIVE: "elective",
  REVIEW: "review",
} as const;
