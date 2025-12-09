"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout";
import { Button, Card, CustomSelect } from "@/components/ui";
import { updateUser } from "@/lib/auth";

const institutions = [
  { value: "bellevue", label: "Bellevue College" },
  { value: "edmonds", label: "Edmonds College" },
  { value: "north-seattle", label: "North Seattle College" },
  { value: "seattle-central", label: "Seattle Central College" },
  { value: "south-seattle", label: "South Seattle College" },
  { value: "shoreline", label: "Shoreline Community College" },
  { value: "other", label: "Other (Add Institution manually)" },
];

export default function InstitutionPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("");

  const handleContinue = () => {
    if (!selected) return;
    const selectedInstitution = institutions.find(inst => inst.value === selected);
    updateUser({ institution: selectedInstitution?.label || selected });
    router.push("/onboarding/student-info");
  };

  return (
    <AuthLayout
      title="Choose Your Previous Institution"
      subtitle="Select the college or university you previously attended."
      backHref="/signup"
      footerText=""
      footerLinkText=""
      footerLinkHref=""
    >
      <Card className="max-w-lg">
        <CustomSelect
          label="Select your Institution"
          options={institutions}
          placeholder="Select your Institution"
          value={selected}
          onChange={(value) => setSelected(value)}
        />

        <Button fullWidth disabled={!selected} onClick={handleContinue} className="mt-6">
          Continue
        </Button>
      </Card>
    </AuthLayout>
  );
}
