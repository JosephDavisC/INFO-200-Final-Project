"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout";
import {
  Button,
  Card,
  Checkbox,
  FileUpload,
  SupportedFormats,
  LoadingSpinner,
} from "@/components/ui";
import { ROUTES } from "@/lib/constants";
import { getUser } from "@/lib/auth";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = getUser();
    setIsLoggedIn(!!user);
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleContinue = async () => {
    if (!file || !agreed) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate upload progress
      setProgress(20);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Store file info in localStorage
      localStorage.setItem(
        "uploadedTranscript",
        JSON.stringify({
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString(),
        })
      );

      setProgress(50);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Call API to match courses
      const response = await fetch('/api/match-courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name }),
      });

      setProgress(80);
      const data = await response.json();

      if (data.success) {
        // Store results in localStorage
        localStorage.setItem('courseMatches', JSON.stringify(data));
        setProgress(100);
        await new Promise(resolve => setTimeout(resolve, 300));
        router.push(ROUTES.RESULTS);
      }
    } catch (error) {
      console.error('Error processing transcript:', error);
      alert('Failed to process transcript. Please try again.');
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <>
      {isProcessing && (
        <LoadingSpinner
          message="Analyzing your transcript..."
          progress={progress}
        />
      )}

      <div className="min-h-screen flex flex-col">
        <PageHeader
          title="Upload Your Transcript"
          subtitle="Upload your unofficial transcript to begin your evaluation."
        />

        <main className="flex-1 flex flex-col items-center px-4 py-6 bg-white">
        <Card className="max-w-lg">
          <FileUpload onFileSelect={handleFileSelect} />

          <SupportedFormats />

          {file && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                Selected: <span className="font-medium">{file.name}</span>
              </p>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-4 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-900 mb-3">
              After uploading, the system will:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 flex-shrink-0" />
                Analyze course matches using AI
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 flex-shrink-0" />
                Show transfer results and equivalencies
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 flex-shrink-0" />
                Flag courses needing advisor review
              </li>
            </ul>

            {/* Data & AI Usage Notice */}
            <div className="mt-4 bg-gray-100 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-semibold text-gray-900">About Your Data & AI Usage</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                This tool uses AI to match your courses with UW equivalents. Your transcript data is processed securely and is not stored permanently. All results should be verified with an academic advisor. This tool complies with FERPA guidelines for educational records.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <Checkbox
              label="I consent to upload and understand how my data is used (FERPA)"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
          </div>

          <Button
            onClick={handleContinue}
            fullWidth
            className="mt-5"
            disabled={!file || !agreed}
          >
            Continue
          </Button>
        </Card>

        <Link
          href={isLoggedIn ? ROUTES.DASHBOARD : "/onboarding/student-info"}
          className="w-full max-w-lg mt-6"
        >
          <Button variant="outline" size="sm" fullWidth>
            {isLoggedIn ? "Back to Dashboard" : "Back"}
          </Button>
        </Link>
      </main>
    </div>
    </>
  );
}
