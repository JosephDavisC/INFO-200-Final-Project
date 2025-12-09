"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout";
import {
  Button,
  Card,
  Input,
  Checkbox,
  Divider,
  GoogleButton,
} from "@/components/ui";
import { ROUTES } from "@/lib/constants";
import { saveUser } from "@/lib/auth";

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignUp = () => {
    // Simulate Google sign up - In a real implementation, this would use Google OAuth
    // and retrieve the user's actual name from their Google account
    // For demo purposes, we'll simulate fetching the authenticated user's name
    const googleUser = {
      fullName: "John Doe", // This would come from Google OAuth response
      email: "john.doe@gmail.com" // This would come from Google OAuth response
    };
    saveUser(googleUser);
    router.push("/onboarding/institution");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreed) {
      setError("Please agree to the terms and privacy policy");
      return;
    }

    // Save user to localStorage
    saveUser({ fullName, email });
    router.push("/onboarding/institution");
  };

  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Enter your information to create your student account."
      backHref={ROUTES.HOME}
      footerText="Already have an account?"
      footerLinkText="Log In"
      footerLinkHref={ROUTES.LOGIN}
    >
      <Card className="max-w-md">
        <GoogleButton onClick={handleGoogleSignUp} className="mb-6" />

        <Divider text="or" className="mb-6" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Checkbox
            label="I agree to the terms and privacy policy."
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />

          <Button type="submit" fullWidth className="mt-4">
            Sign Up
          </Button>
        </form>
      </Card>
    </AuthLayout>
  );
}
