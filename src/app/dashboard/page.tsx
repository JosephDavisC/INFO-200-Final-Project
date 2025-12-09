"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout";
import { Button, Card } from "@/components/ui";
import { getUser, logout } from "@/lib/auth";
import { ROUTES } from "@/lib/constants";

// Mock report data
const mockReports = [
  {
    id: 1,
    date: "Nov 15, 2024",
    institution: "Bellevue College",
    credits: 90,
    status: "pending" as const,
  },
  {
    id: 2,
    date: "Oct 28, 2024",
    institution: "Bellevue College",
    credits: 30,
    status: "complete" as const,
  },
  {
    id: 3,
    date: "Sept 12, 2024",
    institution: "Bellevue College",
    credits: 22,
    status: "complete" as const,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getUser>>(null);

  useEffect(() => {
    const userData = getUser();
    if (!userData) {
      router.push(ROUTES.LOGIN);
      return;
    }
    setUser(userData);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push(ROUTES.HOME);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PageHeader
        title="Your Dashboard"
        subtitle="Manage your transfer evaluations and account settings."
      />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Welcome Section */}
          <Card className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Welcome back, {user.fullName || "John Doe"}!
                </h2>
                <p className="text-gray-500 text-sm sm:text-base mt-1">{user.email || "john.doe@uw.edu"}</p>
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                Edit Profile
              </Button>
            </div>
          </Card>

          {/* Quick Actions Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {/* Upload New Transcript */}
            <Card className="flex flex-col items-center text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-uw-purple/10 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-uw-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-3">Upload New Transcript</h3>
              <Link href={ROUTES.UPLOAD} className="w-full mt-auto">
                <Button fullWidth>Upload</Button>
              </Link>
            </Card>

            {/* View Latest Report */}
            <Card className="flex flex-col items-center text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-uw-gold/20 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-uw-gold-metallic" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-3">View Latest Report</h3>
              <Link href={ROUTES.RESULTS} className="w-full mt-auto">
                <Button variant="outline" fullWidth>View Report</Button>
              </Link>
            </Card>

            {/* Contact Advisor */}
            <Card className="flex flex-col items-center text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-uw-gold/20 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-uw-gold-metallic" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-3">Contact Advisor</h3>
              <Link href={ROUTES.ADVISOR_REVIEW} className="w-full mt-auto">
                <Button variant="outline" fullWidth>Send Email</Button>
              </Link>
            </Card>
          </div>

          {/* Your Evaluation Reports */}
          <Card className="mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Your Evaluation Reports</h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left pb-3 text-xs sm:text-sm font-semibold text-gray-500 pr-2">Report Date</th>
                      <th className="text-left pb-3 text-xs sm:text-sm font-semibold text-gray-500 px-2">Institution Name</th>
                      <th className="text-left pb-3 text-xs sm:text-sm font-semibold text-gray-500 px-2">Total Credits</th>
                      <th className="text-left pb-3 text-xs sm:text-sm font-semibold text-gray-500 px-2">Status</th>
                      <th className="text-left pb-3 text-xs sm:text-sm font-semibold text-gray-500 pl-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockReports.map((report) => (
                      <tr key={report.id} className="border-b border-gray-100 last:border-b-0">
                        <td className="py-3 sm:py-4 text-xs sm:text-sm text-gray-900 pr-2 whitespace-nowrap">{report.date}</td>
                        <td className="py-3 sm:py-4 text-xs sm:text-sm text-gray-900 px-2">{report.institution}</td>
                        <td className="py-3 sm:py-4 text-xs sm:text-sm text-gray-900 px-2 whitespace-nowrap">{report.credits} credits</td>
                        <td className="py-3 sm:py-4 px-2">
                          <span
                            className={`inline-block px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap ${
                              report.status === "complete"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {report.status === "complete" ? "Complete" : "Pending"}
                          </span>
                        </td>
                        <td className="py-3 sm:py-4 pl-2">
                          <Link
                            href={ROUTES.RESULTS}
                            className="text-uw-purple font-semibold hover:underline text-xs sm:text-sm whitespace-nowrap"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* Account Settings */}
          <Card>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Account Settings</h2>

            <div className="space-y-3 sm:space-y-4 mb-6">
              {/* Institution */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 sm:pb-4 border-b border-gray-200 gap-2 sm:gap-0">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Institution</p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{user.institution || "Bellevue College"}</p>
                  </div>
                </div>
                <button className="text-uw-gold-metallic font-semibold hover:underline text-xs sm:text-sm self-start sm:self-auto">
                  Change
                </button>
              </div>

              {/* Intended Major */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 sm:pb-4 border-b border-gray-200 gap-2 sm:gap-0">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Intended Major</p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{user.major || "Informatics"}</p>
                  </div>
                </div>
                <button className="text-uw-gold-metallic font-semibold hover:underline text-xs sm:text-sm self-start sm:self-auto">
                  Change
                </button>
              </div>

              {/* Expected Graduation */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 sm:pb-4 gap-2 sm:gap-0">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Expected Graduation</p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{user.graduationYear || "2025"}</p>
                  </div>
                </div>
                <button className="text-uw-gold-metallic font-semibold hover:underline text-xs sm:text-sm self-start sm:self-auto">
                  Change
                </button>
              </div>
            </div>

            {/* Log Out Button */}
            <button
              onClick={handleLogout}
              className="w-full bg-white text-red-600 border-2 border-red-600 rounded-md py-2.5 sm:py-3 text-sm sm:text-base font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log Out
            </button>
          </Card>
        </div>
      </main>
    </div>
  );
}
