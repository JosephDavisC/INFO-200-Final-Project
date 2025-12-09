"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/layout";
import { Button, Card } from "@/components/ui";
import { getUser } from "@/lib/auth";
import { ROUTES } from "@/lib/constants";
import { generateTransferEvaluationPDF } from "@/lib/pdfGenerator";

interface TranscriptInfo {
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

interface Course {
  originalCode: string;
  originalTitle: string;
  originalInstitution: string;
  uwCode: string;
  uwTitle: string;
  credits: number;
  description: string;
  tags: string[];
  note?: string;
}

// Mock data for demonstration
const directTransferCourses: Course[] = [
  {
    originalCode: "ENGL 101",
    originalTitle: "English Composition I",
    originalInstitution: "North Seattle College",
    uwCode: "ENGL 131",
    uwTitle: "Composition: Exposition",
    credits: 5,
    description: "Introduction to academic writing and critical reading.",
    tags: ["[W]"],
  },
  {
    originalCode: "MATH 142",
    originalTitle: "Precalculus II",
    originalInstitution: "North Seattle College",
    uwCode: "MATH 120",
    uwTitle: "Precalculus",
    credits: 5,
    description: "Functions, graphs, and trigonometry preparation for calculus.",
    tags: ["NSc", "[RSN]"],
  },
  {
    originalCode: "BIOL& 211",
    originalTitle: "Majors Cellular",
    originalInstitution: "North Seattle College",
    uwCode: "BIOL 180",
    uwTitle: "Introductory Biology",
    credits: 5,
    description: "Mendelian genetics, evolution, biodiversity of life forms, ecology, and conservation biology.",
    tags: ["NSc"],
  },
  {
    originalCode: "BIOL& 212",
    originalTitle: "Majors Animal",
    originalInstitution: "North Seattle College",
    uwCode: "BIOL 200",
    uwTitle: "Introductory Biology",
    credits: 5,
    description: "Metabolism and energetics, structure and function of biomolecules, cell structure and function, developmental patterning.",
    tags: ["NSc"],
  },
  {
    originalCode: "BIOL& 213",
    originalTitle: "Majors Plant",
    originalInstitution: "North Seattle College",
    uwCode: "BIOL 220",
    uwTitle: "Introductory Biology",
    credits: 5,
    description: "Animal physiology, plant development and physiology. Final course in a three-quarter series (BIOL 180, BIOL 200, BIOL 220).",
    tags: ["NSc"],
  },
  {
    originalCode: "CSC 142",
    originalTitle: "Computer Programming I",
    originalInstitution: "North Seattle College",
    uwCode: "CSE 142",
    uwTitle: "Computer Programming I",
    credits: 5,
    description: "Introduction to procedural computer programming.",
    tags: ["NSc", "[RSN]"],
  },
  {
    originalCode: "CSC 143",
    originalTitle: "Computer Programming II",
    originalInstitution: "North Seattle College",
    uwCode: "CSE 143",
    uwTitle: "Computer Programming II",
    credits: 5,
    description: "Continuation of CSE 142.",
    tags: ["NSc", "[RSN]"],
  },
  {
    originalCode: "PHY 121",
    originalTitle: "Univ Physics I: Mechanics",
    originalInstitution: "Arizona State University",
    uwCode: "PHYS 121",
    uwTitle: "Mechanics",
    credits: 5,
    description: "The first course in the introductory physics sequence.",
    tags: ["NSc", "[RSN]"],
  },
];

const needsReviewCourses: Course[] = [
  {
    originalCode: "PHY 122",
    originalTitle: "University Physics Lab I",
    originalInstitution: "Arizona State University",
    uwCode: "PHYS 1XX",
    uwTitle: "Transfer Course",
    credits: 1,
    description: "Transfer physics course.",
    tags: [],
  },
  {
    originalCode: "PSY 331",
    originalTitle: "Cognition",
    originalInstitution: "Arizona State University",
    uwCode: "PSYCH 3XX",
    uwTitle: "Transfer Course",
    credits: 4.5,
    description: "Transfer psychology course.",
    tags: [],
    note: "NOTE: This course is similar to PSYCH 355, Cognitive Psychology. To determine if it can transfer to the UW as this class, reach out to an advisor or to the UW Department of Psychology.",
  },
  {
    originalCode: "SPN 202",
    originalTitle: "Intermediate Spanish",
    originalInstitution: "Arizona State University",
    uwCode: "SPAN 2XX",
    uwTitle: "Transfer Course",
    credits: 4.5,
    description: "Transfer spanish course.",
    tags: [],
    note: "NOTE: This course is similar to SPAN 201, Intermediate Spanish. To determine if it can transfer to the UW as this class, reach out to an advisor or to the UW Department of Spanish and Portuguese Studies.",
  },
];

// Tag colors - matching the legend design
const tagColors: Record<string, string> = {
  SSc: "bg-red-500 text-white",
  NW: "bg-green-600 text-white",
  NSc: "bg-green-600 text-white",
  "A&H": "bg-blue-500 text-white",
  VLPA: "bg-blue-500 text-white",
  C: "bg-green-700 text-white",
  "[C]": "bg-green-700 text-white",
  "[RSN]": "bg-yellow-600 text-white",
  "[W]": "bg-yellow-500 text-white",
  Elective: "bg-gray-400 text-white",
  "VLPA or SSc": "bg-purple-500 text-white",
  Mathematics: "bg-orange-500 text-white",
};

// Legend items
const legendItems = [
  { tag: "SSc", label: "Social Sciences" },
  { tag: "NSc", label: "Natural Sciences" },
  { tag: "A&H", label: "Arts & Humanities" },
  { tag: "[C]", label: "Composition" },
  { tag: "[RSN]", label: "Reasoning" },
  { tag: "[W]", label: "Additional Writing" },
];

function CourseCard({ course, type }: { course: Course; type: "direct" | "review" }) {
  const statusColor = type === "direct"
    ? "bg-green-600 text-white"
    : "bg-red-500 text-white";
  const statusText = type === "direct" ? "Direct Transfer" : "Needs Review";

  return (
    <div className="border border-gray-200 rounded-lg p-3 sm:p-4 mb-4">
      {/* Mobile: Stack vertically, Desktop: Side by side */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
        {/* Left side - Course mapping */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 flex-1">
          {/* Original Course */}
          <div className="flex-1 min-w-0">
            <p className="text-uw-gold-metallic font-medium text-sm sm:text-base">{course.originalCode}</p>
            <p className="text-gray-900 font-medium text-sm sm:text-base">{course.originalTitle}</p>
            <p className="text-gray-500 text-xs sm:text-sm">at {course.originalInstitution}</p>
          </div>

          {/* Arrow */}
          <div className="hidden sm:flex items-center justify-center pt-2 flex-shrink-0">
            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>

          {/* Mobile arrow */}
          <div className="sm:hidden flex items-center justify-center my-1">
            <svg className="w-5 h-5 text-gray-400 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* UW Course */}
          <div className="flex-1 min-w-0">
            <p className="text-uw-gold-metallic font-medium text-sm sm:text-base">{course.uwCode}</p>
            <p className="text-gray-900 font-medium text-sm sm:text-base">{course.uwTitle}</p>
            <p className="text-gray-500 text-xs sm:text-sm">at the UW</p>
          </div>
        </div>

        {/* Right side - Status and credits */}
        <div className="flex flex-row sm:flex-col lg:items-end gap-2">
          <span className={`px-3 py-1 rounded text-xs font-medium ${statusColor} whitespace-nowrap`}>
            {statusText}
          </span>
          <span className="px-3 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 whitespace-nowrap">
            {course.credits} credit{course.credits !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-xs sm:text-sm mt-3">{course.description}</p>

      {/* Tags below description */}
      {course.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {course.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-1 rounded text-xs font-semibold ${tagColors[tag] || "bg-gray-200 text-gray-700"}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Note (for needs review courses) */}
      {course.note && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-xs sm:text-sm">{course.note}</p>
        </div>
      )}
    </div>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getUser>>(null);
  const [transcript, setTranscript] = useState<TranscriptInfo | null>(null);
  const [directTransferCoursesState, setDirectTransferCourses] = useState<Course[]>([]);
  const [needsReviewCoursesState, setNeedsReviewCourses] = useState<Course[]>([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [directTransferCredits, setDirectTransferCredits] = useState(0);
  const [needsReviewCredits, setNeedsReviewCredits] = useState(0);

  useEffect(() => {
    setUser(getUser());
    const transcriptData = localStorage.getItem("uploadedTranscript");
    if (transcriptData) {
      setTranscript(JSON.parse(transcriptData));
    }

    // Load course matches from localStorage
    const matchesData = localStorage.getItem("courseMatches");
    if (matchesData) {
      const data = JSON.parse(matchesData);
      if (data.directTransfers) {
        setDirectTransferCourses(data.directTransfers);
      }
      if (data.needsReview) {
        setNeedsReviewCourses(data.needsReview);
      }
      if (data.summary) {
        setTotalCredits(data.summary.totalCredits || 0);
        setDirectTransferCredits(data.summary.directTransferCredits || 0);
        setNeedsReviewCredits(data.summary.needsReviewCredits || 0);
      }
    } else {
      // Use default mock data if no API data available
      setDirectTransferCourses(directTransferCourses);
      setNeedsReviewCourses(needsReviewCourses);
      const mockTotalCredits = directTransferCourses.reduce((sum, c) => sum + c.credits, 0) +
                               needsReviewCourses.reduce((sum, c) => sum + c.credits, 0);
      setTotalCredits(mockTotalCredits);
      setDirectTransferCredits(directTransferCourses.reduce((sum, c) => sum + c.credits, 0));
      setNeedsReviewCredits(needsReviewCourses.reduce((sum, c) => sum + c.credits, 0));
    }
  }, [router]);

  const transferableCredits = totalCredits;

  const handleDownloadPDF = () => {
    // Get the summary data from localStorage or use current state
    const matchesData = localStorage.getItem("courseMatches");
    let summaryData = {
      totalCredits,
      directTransferCredits,
      needsReviewCredits,
      totalCreditsAttempted: totalCredits,
    };

    if (matchesData) {
      const data = JSON.parse(matchesData);
      if (data.summary) {
        summaryData = {
          totalCredits: data.summary.totalCredits || totalCredits,
          directTransferCredits: data.summary.directTransferCredits || directTransferCredits,
          needsReviewCredits: data.summary.needsReviewCredits || needsReviewCredits,
          totalCreditsAttempted: data.summary.totalCreditsAttempted || totalCredits,
        };
      }
    }

    generateTransferEvaluationPDF(
      user,
      directTransferCoursesState,
      needsReviewCoursesState,
      summaryData
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <PageHeader
        title="Your Complete Report"
        subtitle="View your completed transfer equivalency report below."
      />

      {/* Action Bar */}
      <div className="bg-white border-b border-gray-200 py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <Link href={ROUTES.DASHBOARD} className="w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={handleDownloadPDF} className="w-full sm:w-auto">
              <span className="flex items-center justify-center">
                Download Report as a PDF
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </span>
            </Button>
            <Link href={ROUTES.ADVISOR_REVIEW} className="w-full sm:w-auto">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <span className="flex items-center justify-center">
                  Request An Advisor Review
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Student Information Card */}
          <Card className="mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Student Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex flex-col sm:block">
                <span className="font-semibold text-gray-900 text-sm sm:text-base">Name</span>
                <span className="sm:ml-3 text-gray-700 text-sm sm:text-base mt-1 sm:mt-0">{user?.fullName || "John Doe"}</span>
              </div>
              <div className="flex flex-col sm:block">
                <span className="font-semibold text-gray-900 text-sm sm:text-base">Previous Institution(s)</span>
                <span className="sm:ml-3 text-gray-700 text-sm sm:text-base mt-1 sm:mt-0">{user?.institution || "North Seattle College, Arizona State University"}</span>
              </div>
              <div className="flex flex-col sm:block">
                <span className="font-semibold text-gray-900 text-sm sm:text-base">Intended Major</span>
                <span className="sm:ml-3 text-gray-700 text-sm sm:text-base mt-1 sm:mt-0">{user?.major ? `B.S. ${user.major}` : "B.S. Informatics"}</span>
              </div>
              <div className="flex flex-col sm:block">
                <span className="font-semibold text-gray-900 text-sm sm:text-base">Expected Graduation</span>
                <span className="sm:ml-3 text-gray-700 text-sm sm:text-base mt-1 sm:mt-0">{user?.graduationYear ? `Spring ${user.graduationYear}` : "Spring 2028"}</span>
              </div>
            </div>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {/* Total Credits */}
            <div className="border-2 border-gray-200 rounded-lg p-3 sm:p-4 bg-white">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mb-2">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{totalCredits}</p>
              <p className="text-uw-purple text-xs sm:text-sm">Total Credits</p>
            </div>

            {/* Transferable Credits */}
            <div className="rounded-lg p-3 sm:p-4 bg-uw-purple text-white">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mb-2">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-2xl sm:text-3xl font-bold">{transferableCredits}</p>
              <p className="text-xs sm:text-sm">Transferable Credits</p>
              <p className="text-[10px] sm:text-xs opacity-80">(90 credit max of lower-division)</p>
            </div>

            {/* Direct Transfer Credits */}
            <div className="rounded-lg p-3 sm:p-4 bg-green-600 text-white">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mb-2">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-2xl sm:text-3xl font-bold">{directTransferCredits}</p>
              <p className="text-xs sm:text-sm">Direct Transfer Credits</p>
            </div>

            {/* Needs Review */}
            <div className="rounded-lg p-3 sm:p-4 bg-red-500 text-white">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mb-2">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-2xl sm:text-3xl font-bold">{needsReviewCredits}</p>
              <p className="text-xs sm:text-sm">Needs Review</p>
            </div>
          </div>

          {/* Legend */}
          <Card className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">Legend</h3>
              <span className="text-gray-600 text-xs sm:text-sm">Courses with these labels meet the following UW Requirements:</span>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {legendItems.map((item) => (
                <div key={item.tag} className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${tagColors[item.tag]}`}>
                    {item.tag}
                  </span>
                  <span className="text-gray-700 text-xs sm:text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Direct Transfer Courses Section */}
          <Card className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Direct Transfer Courses</h2>
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {directTransferCoursesState.length} courses
              </span>
            </div>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              These courses have a direct equivalent at the UW, and will transfer automatically.
            </p>

            {directTransferCoursesState.map((course, index) => (
              <CourseCard key={index} course={course} type="direct" />
            ))}
          </Card>

          {/* Needs Review Section */}
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Needs Review</h2>
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {needsReviewCoursesState.length} courses
              </span>
            </div>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              These courses do not yet have direct equivalent at the UW, and will need to be reviewed by an advisor.
            </p>

            {needsReviewCoursesState.map((course, index) => (
              <CourseCard key={index} course={course} type="review" />
            ))}
          </Card>
        </div>
      </main>
    </div>
  );
}
