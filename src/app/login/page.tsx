"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthLayout } from "@/components/layout";
import {
  Button,
  Card,
  Input,
  Divider,
  GoogleButton,
} from "@/components/ui";
import { ROUTES } from "@/lib/constants";
import { saveUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleLogin = () => {
    // Simulate Google login - In a real implementation, this would use Google OAuth
    // and retrieve the user's actual name from their Google account
    // For demo purposes, we'll simulate fetching the authenticated user's name
    const googleUser = {
      fullName: "John Doe", // This would come from Google OAuth response
      email: "john.doe@gmail.com" // This would come from Google OAuth response
    };
    saveUser(googleUser);
    router.push(ROUTES.DASHBOARD);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Simulate login - accept any credentials for testing
    saveUser({ fullName: "John Doe", email });
    router.push(ROUTES.DASHBOARD);
  };

  return (
    <AuthLayout
      title="Log In to Your Account"
      subtitle="Enter your credentials to access your student account."
      backHref={ROUTES.HOME}
      footerText="Don't have an account?"
      footerLinkText="Sign Up"
      footerLinkHref={ROUTES.SIGNUP}
    >
      <Card className="max-w-md">
        <GoogleButton onClick={handleGoogleLogin} className="mb-6" />

        <Divider text="or" className="mb-6" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-right mt-2">
              <Link
                href={ROUTES.FORGOT_PASSWORD}
                className="text-sm text-uw-purple hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button type="submit" fullWidth className="mt-4">
            Log In
          </Button>
        </form>
      </Card>
    </AuthLayout>
  );
}
