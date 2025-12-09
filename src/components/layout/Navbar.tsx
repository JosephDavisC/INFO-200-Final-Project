"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { getUser } from "@/lib/auth";

const navLinks = [
  { label: "Home", href: ROUTES.HOME },
  { label: "Apply", href: "#" },
  { label: "Programs", href: "#" },
  { label: "Resources", href: "#" },
  { label: "Contact", href: "#" },
];

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = getUser();
    setIsLoggedIn(!!user);
  }, []);

  return (
    <nav className="bg-uw-purple text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <Link href={ROUTES.HOME} className="flex items-center gap-3">
            <Image
              src="/uw-logo.png"
              alt="UW Logo"
              width={40}
              height={32}
              className="h-8 w-auto"
            />
            <div className="hidden sm:block">
              <p className="font-semibold text-sm">University of Washington</p>
              <p className="text-xs text-uw-gold">Transfer Admissions</p>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium hover:text-uw-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="hover:text-uw-gold transition-colors">
              <SearchIcon />
            </button>
            {isLoggedIn ? (
              <Link
                href={ROUTES.DASHBOARD}
                className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                title="Go to Dashboard"
              >
                <UserIcon />
              </Link>
            ) : (
              <Link
                href={ROUTES.LOGIN}
                className="flex items-center gap-2 border border-white rounded-md px-3 py-1.5 text-sm hover:bg-white/10 transition-colors"
              >
                <UserIcon />
                <span className="hidden sm:inline">Login / Sign Up</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function SearchIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function UserIcon() {
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
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}
