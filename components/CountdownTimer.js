'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import Image from 'next/image';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    // Countdown to Tuesday 9:00 AM
    const updateTimer = () => {
      const now = new Date();

      // Set target date to next Tuesday at 9:00 AM
      const targetDate = new Date();
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday

      // Calculate days until Tuesday (2)
      let daysUntilTuesday = 0;
      if (currentDay === 0) { // Sunday
        daysUntilTuesday = 2;
      } else if (currentDay === 1) { // Monday
        daysUntilTuesday = 1;
      } else if (currentDay === 2) { // Tuesday
        // If it's Tuesday but before 9 AM, target is today
        // If it's after 9 AM, target is next Tuesday
        if (now.getHours() < 9 || (now.getHours() === 9 && now.getMinutes() === 0 && now.getSeconds() === 0)) {
          daysUntilTuesday = 0;
        } else {
          daysUntilTuesday = 7;
        }
      } else { // Wednesday to Saturday
        daysUntilTuesday = (2 + 7 - currentDay) % 7;
      }

      targetDate.setDate(now.getDate() + daysUntilTuesday);
      targetDate.setHours(9, 0, 0, 0);

      const diff = targetDate - now;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-600 text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 flex-wrap">
        {/* ABT Logo */}
        <div className="hidden md:block">
          <Image src="/bti_logo_text.svg" alt="איגוד הבריכות הטיפוליות" width={120} height={50} className="brightness-0 invert" />
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-6 h-6 animate-pulse" />
          <span className="font-bold text-lg">הזמן אוזל!</span>
        </div>

        <div className="flex gap-3">
          <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg text-center min-w-[70px]">
            <div className="text-3xl font-black">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-xs font-semibold">שעות</div>
          </div>
          <div className="text-3xl font-black self-center">:</div>
          <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg text-center min-w-[70px]">
            <div className="text-3xl font-black">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-xs font-semibold">דקות</div>
          </div>
          <div className="text-3xl font-black self-center">:</div>
          <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg text-center min-w-[70px]">
            <div className="text-3xl font-black">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-xs font-semibold">שניות</div>
          </div>
        </div>

        <span className="font-bold text-lg">עד יום שלישי 9:00 בבוקר</span>
      </div>
    </div>
  );
}
