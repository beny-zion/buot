'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-sky-900 to-sky-950 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* ABT Logo and Organization Name */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-4">
            <Image
              src="/bti_logo_text.svg"
              alt="איגוד הבריכות הטיפוליות"
              width={250}
              height={100}
              className="w-48 md:w-64"
            />
          </div>
          <p className="text-lg text-sky-200 text-center">
            מתנגדים לביטול השתתפות המדינה בטיפולי הידרותרפיה
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mb-6"></div>

        {/* Bottom text */}
        <div className="text-center text-sm text-sky-300">
          <p>© {new Date().getFullYear()} איגוד הבריכות הטיפוליות. כל הזכויות שמורות.</p>
          <p className="mt-2">יחד ננצח - המים הם החמצן שלהם</p>
        </div>
      </div>
    </footer>
  );
}
