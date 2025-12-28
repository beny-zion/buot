'use client';

import { AlertTriangle } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-900 via-sky-700 to-sky-500">
      {/* Animated water waves background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('/water-pattern.svg')] animate-wave"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Urgent banner */}
        <div className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full mb-6 animate-pulse shadow-lg">
          <AlertTriangle className="w-6 h-6" />
          <span className="font-bold text-lg">דחוף! הזמן אוזל</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl leading-tight">
          אל תתנו להם
          <br />
          <span className="text-red-500 animate-pulse">לייבש את זה</span>
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl text-white font-bold mb-4 drop-shadow-lg">
          המים הם החמצן שלהם
        </p>

        {/* Description */}
        <div className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-6 max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            משרד הבריאות עומד לבטל את הזכאות לטיפולי הידרותרפיה בבריכות טיפוליות
            <br />
            מהביטוחים המשלימים.
            <br />
            <span className="font-black text-red-300">אלפי ילדים עם צרכים מיוחדים יאבדו את הטיפול היחיד שעובד.</span>
          </p>
        </div>

        {/* CTA scroll hint */}
        <div className="mt-12">
          <p className="text-white text-xl font-bold mb-4">חתמו עכשיו לפני שיהיה מאוחר מדי</p>
          <div className="animate-bounce">
            <svg
              className="w-8 h-8 mx-auto text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Inline styles for wave animation */}
      <style jsx>{`
        @keyframes wave {
          0% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-25%) translateY(5%);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }
        .animate-wave {
          animation: wave 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
