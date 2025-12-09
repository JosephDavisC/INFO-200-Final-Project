/**
 * Footer Component
 * Site-wide footer with team information and project links
 */

import Link from "next/link";

export function Footer() {
  const teamMembers = [
    "Joseph Chamdani",
    "Aahil Irfan",
    "Bosen Shen",
    "Colette Apostol",
    "Elizabeth Genoway",
  ];

  return (
    <footer className="bg-uw-purple text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Team Members */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Team Members</h3>
            <ul className="space-y-1 text-sm">
              {teamMembers.map((member) => (
                <li key={member} className="text-gray-200">
                  {member}
                </li>
              ))}
            </ul>
          </div>

          {/* Project Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Project Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://github.com/JosephDavisC/INFO-200-Final-Project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-uw-gold transition-colors inline-flex items-center gap-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GitHub Repository
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.figma.com/design/UPnuZz5vmLkko7QrJsmvKj/AI-Assisted-Transfer-Evaluation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-uw-gold transition-colors inline-flex items-center gap-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" />
                    <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" />
                    <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" />
                    <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" />
                    <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" />
                  </svg>
                  Figma Design File
                </Link>
              </li>
            </ul>
          </div>

          {/* Course Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Course Information</h3>
            <div className="text-sm text-gray-200 space-y-1">
              <p>INFO 200 - Introduction to Informatics</p>
              <p>University of Washington</p>
              <p>Final Prototype Demonstration</p>
              <p className="pt-2 text-xs text-gray-300">
                This is a student demo project created for educational purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/20 text-center text-sm text-gray-300">
          <p>&copy; 2025 UW INFO 200 Transfer Evaluation Tool. Academic demo project.</p>
        </div>
      </div>
    </footer>
  );
}
