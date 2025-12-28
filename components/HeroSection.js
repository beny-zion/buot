'use client';

import { AlertTriangle } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://res.cloudinary.com/dpiw23uql/image/upload/v1766945378/amazon-dropship/categories/g3pgqtjztzjoox8cj63x.jpg)' }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
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

        {/* CTA button */}
        <div className="mt-12">
          <a
            href="#sign-form"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-black text-2xl md:text-3xl py-5 px-12 rounded-full transition-all transform hover:scale-105 shadow-2xl animate-pulse"
          >
            חתמו עכשיו לפני שיהיה מאוחר מדי ↓
          </a>
        </div>
      </div>
    </div>
  );
}
