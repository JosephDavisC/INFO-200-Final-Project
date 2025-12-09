"use client";

import { AuthLayout } from "@/components/layout";
import { Button, Card, Input } from "@/components/ui";
import { ROUTES } from "@/lib/constants";

export default function ForgotPasswordPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset
    console.log("Password reset requested");
  };

  return (
    <AuthLayout
      title="Forgot Your Password?"
      subtitle="Enter your email to reset your student account password."
      backHref={ROUTES.LOGIN}
      footerText="Remember your password?"
      footerLinkText="Log In"
      footerLinkHref={ROUTES.LOGIN}
    >
      <Card className="max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            helperText="An email will be sent to you with password reset instructions."
          />

          <Button type="submit" fullWidth className="mt-4">
            Send Reset Link
          </Button>
        </form>
      </Card>
    </AuthLayout>
  );
}
