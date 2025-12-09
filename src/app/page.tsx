"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui";
import {
  StepCard,
  DocumentIcon,
  DocumentsIcon,
  SendIcon,
  CheckCircleIcon,
} from "@/components/home";
import { ROUTES } from "@/lib/constants";
import { getUser } from "@/lib/auth";

const steps = [
  {
    step: 1,
    icon: <DocumentIcon />,
    title: "Review Requirements",
    description: "Check transfer eligibility and prerequisites",
    estimatedTime: "15 min",
  },
  {
    step: 2,
    icon: <DocumentsIcon />,
    title: "Prepare Documents",
    description: "Gather transcripts and required materials",
    estimatedTime: "2-3 days",
  },
  {
    step: 3,
    icon: <SendIcon />,
    title: "Submit Application",
    description: "Complete and submit your transfer application",
    estimatedTime: "1-2 hours",
  },
  {
    step: 4,
    icon: <CheckCircleIcon />,
    title: "Receive Decision",
    description: "Wait for admission decision notification",
    estimatedTime: "4-6 weeks",
  },
];

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = getUser();
    setIsLoggedIn(!!user);
  }, []);

  const handleStartApplication = () => {
    if (isLoggedIn) {
      router.push(ROUTES.DASHBOARD);
    } else {
      router.push(ROUTES.SIGNUP);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-100 to-gray-50 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <span className="inline-block bg-white border border-uw-purple/20 text-uw-purple text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-6">
            Official Transfer Portal
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Transfer Application Process
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Complete these steps to transfer to the University of Washington
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-gray-200 p-4 sm:p-6 lg:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-4">
              {steps.map((step, index) => (
                <StepCard
                  key={step.step}
                  {...step}
                  showArrow={index < steps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Buttons */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Button size="lg" className="gap-2" onClick={handleStartApplication}>
              Start Application
              <ArrowIcon />
            </Button>
          </div>
        </div>
      </section>

      {/* Announcement Banner */}
      <section className="py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 border-l-4 border-uw-gold rounded-r-lg px-4 sm:px-6 py-3 sm:py-4 flex items-start sm:items-center gap-3">
            <CalendarIcon />
            <p className="text-gray-700 text-sm sm:text-base">
              <span className="font-semibold text-uw-purple">
                Winter 2026 Applications:
              </span>{" "}
              Now accepting applications through February 15, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="flex-1" />
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      className="w-5 h-5 text-uw-gold flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}
