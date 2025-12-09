"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout";
import { Button, Card, Input, Select, Checkbox } from "@/components/ui";
import { getUser, updateUser } from "@/lib/auth";

const graduationYears = [
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
  { value: "2027", label: "2027" },
  { value: "2028", label: "2028" },
];

export default function StudentInfoPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [major, setMajor] = useState("Informatics");
  const [graduationYear, setGraduationYear] = useState("2025");
  const [studentId, setStudentId] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  // Pre-fill with demo data
  useEffect(() => {
    // Override any existing user data with demo information
    setFullName("John Doe");
    setEmail("john.doe@example.com");
    setMajor("Informatics");
    setGraduationYear("2025");
    setStudentId("");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) return;

    updateUser({
      fullName,
      email,
      major,
      graduationYear,
      studentId,
    });

    router.push("/upload");
  };

  return (
    <AuthLayout
      title="Student Information Form"
      subtitle="Enter your student details before uploading your transcript."
      backHref="/onboarding/institution"
      footerText=""
      footerLinkText=""
      footerLinkHref=""
    >
      <Card className="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Major or Intended Major"
            type="text"
            placeholder="Enter your major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />

          <Select
            label="Graduation / Transfer Year"
            options={graduationYears}
            placeholder="Select year"
            value={graduationYear}
            onChange={(e) => setGraduationYear(e.target.value)}
          />

          <Input
            label="Student ID (optional)"
            type="text"
            placeholder="Enter your student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

          <div className="pt-2">
            <Checkbox
              label="I confirm the information above is correct."
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
          </div>

          <Button fullWidth type="submit" disabled={!confirmed} className="mt-4">
            Continue
          </Button>
        </form>
      </Card>
    </AuthLayout>
  );
}
