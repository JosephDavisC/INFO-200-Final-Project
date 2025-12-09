/**
 * Application Types
 * Shared TypeScript interfaces and types
 */

import { MATCH_TYPES } from "@/lib/constants";

/**
 * Course information from a student's transcript
 */
export interface StudentCourse {
  courseCode: string;
  courseTitle: string;
  credits: number;
  grade: string;
  institution?: string;
}

/**
 * Match type for course equivalencies
 */
export type MatchType = (typeof MATCH_TYPES)[keyof typeof MATCH_TYPES];

/**
 * Result of matching a student course to UW equivalencies
 */
export interface CourseMatch {
  studentCourse: StudentCourse;
  uwEquivalent: string;
  uwTitle: string;
  transferCredits: number;
  category: string;
  matchType: MatchType;
  reasoning: string;
}

/**
 * Summary of transfer evaluation results
 */
export interface TransferSummary {
  totalCreditsAttempted: number;
  totalCreditsTransferred: number;
  directTransfers: number;
  electiveCredits: number;
  needsReview: number;
  degreeApplicable: number;
  unappliedCredits: number;
}

/**
 * Complete result from the course matching API
 */
export interface MatchResult {
  matches: CourseMatch[];
  summary: TransferSummary;
}

/**
 * User information for the application
 */
export interface User {
  id: string;
  email: string;
  fullName: string;
  major?: string;
}
