import { type ReactNode } from "react";
import Link from "next/link";
import { PageHeader } from "./PageHeader";
import { Button } from "@/components/ui";

export interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  backHref?: string;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
}

function AuthLayout({
  children,
  title,
  subtitle,
  backHref = "/",
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title={title} subtitle={subtitle} />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-white">
        {children}

        {/* Bottom Section */}
        <div className="flex items-center justify-between w-full max-w-lg mt-8">
          <Link href={backHref}>
            <Button variant="outline" size="sm">
              Back
            </Button>
          </Link>

          {footerText && footerLinkText && footerLinkHref && (
            <p className="text-gray-600">
              {footerText}{" "}
              <Link
                href={footerLinkHref}
                className="text-uw-purple font-semibold hover:underline"
              >
                {footerLinkText}
              </Link>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export { AuthLayout };
