"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout";
import { Button, Card, Select } from "@/components/ui";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

const advisors = [
  { value: "dowell-eugenio", label: "Dowell Eugenio (Informatics, last names A-G)" },
  { value: "jane-smith", label: "Jane Smith (Informatics, last names H-N)" },
  { value: "john-doe", label: "John Doe (Informatics, last names O-Z)" },
  { value: "maria-garcia", label: "Maria Garcia (Computer Science)" },
  { value: "robert-chen", label: "Robert Chen (Engineering)" },
];

export default function AdvisorReviewPage() {
  const router = useRouter();
  const [selectedAdvisor, setSelectedAdvisor] = useState(advisors[0].value);
  const [note, setNote] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    // In a real app, this would send the review request
    alert("Advisor review request submitted successfully!");
    router.push(ROUTES.RESULTS);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title="Request an Advisor Review"
        subtitle="Submit a request for a UW advisor to review your equivalency report."
      />

      <main className="flex-1 flex flex-col items-center px-4 py-12 bg-white">
        <Card className="max-w-lg">
          <form onSubmit={handleSubmit}>
            {/* Advisor Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your assigned advisor (select to change)
              </label>
              <Select
                value={selectedAdvisor}
                onChange={(e) => setSelectedAdvisor(e.target.value)}
                options={advisors}
              />
            </div>

            {/* Optional Note */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add a note (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note (Optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uw-purple focus:border-transparent resize-none"
                rows={4}
              />
            </div>

            {/* Consent Checkbox */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 text-uw-purple border-gray-300 rounded focus:ring-uw-purple"
                />
                <span className="text-sm text-gray-700">
                  I agree to the secure use of my file for evaluation.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              disabled={!agreed}
              className="bg-uw-purple hover:bg-uw-purple/90"
            >
              Submit
            </Button>
          </form>
        </Card>

        <Link href={ROUTES.RESULTS} className="w-full max-w-lg mt-8">
          <Button variant="outline" size="sm">
            Back
          </Button>
        </Link>
      </main>
    </div>
  );
}
