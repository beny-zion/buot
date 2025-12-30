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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Countdown to Thursday 9:00 AM
    const updateTimer = () => {
      const now = new Date();

      // Set target date to next Thursday at 9:00 AM
      const targetDate = new Date();
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday

      // Calculate days until Thursday (4)
      let daysUntilThursday = 0;
      if (currentDay === 0) { // Sunday
        daysUntilThursday = 4;
      } else if (currentDay === 1) { // Monday
        daysUntilThursday = 3;
      } else if (currentDay === 2) { // Tuesday
        daysUntilThursday = 2;
      } else if (currentDay === 3) { // Wednesday
        daysUntilThursday = 1;
      } else if (currentDay === 4) { // Thursday
        // If it's Thursday but before 9 AM, target is today
        // If it's after 9 AM, target is next Thursday
        if (now.getHours() < 9 || (now.getHours() === 9 && now.getMinutes() === 0 && now.getSeconds() === 0)) {
          daysUntilThursday = 0;
        } else {
          daysUntilThursday = 7;
        }
      } else { // Friday to Saturday
        daysUntilThursday = (4 + 7 - currentDay) % 7;
      }

      targetDate.setDate(now.getDate() + daysUntilThursday);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`bg-red-600 text-white sticky top-0 z-50 shadow-lg transition-all duration-300 ${
      isScrolled
        ? 'py-1 px-2 md:py-2 md:px-4'
        : 'py-3 px-4 md:py-4 md:px-6'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 md:gap-4 flex-wrap">
        {/* ABT Logo - hidden on mobile when scrolled, smaller on desktop */}
        {!isScrolled && (
          <div className="hidden md:block">
            <Image src="/bti_logo_text.svg" alt="איגוד הבריכות הטיפוליות" width={100} height={40} className="brightness-0 invert" />
          </div>
        )}

        <div className={`flex items-center transition-all duration-300 ${
          isScrolled ? 'gap-1' : 'gap-2'
        }`}>
          <Clock className={`animate-pulse transition-all duration-300 ${
            isScrolled
              ? 'w-3 h-3 md:w-4 md:h-4'
              : 'w-5 h-5 md:w-6 md:h-6'
          }`} />
          <span className={`font-bold transition-all duration-300 ${
            isScrolled
              ? 'text-xs md:text-base'
              : 'text-base md:text-lg'
          }`}>הזמן אוזל!</span>
        </div>

        <div className={`flex transition-all duration-300 ${
          isScrolled ? 'gap-1' : 'gap-2'
        }`}>
          <div className={`bg-white/20 backdrop-blur rounded text-center transition-all duration-300 ${
            isScrolled
              ? 'px-1 py-0.5 min-w-[35px] md:px-2 md:py-1 md:min-w-[50px]'
              : 'px-2 py-1 min-w-[45px] md:px-4 md:py-2 md:min-w-[70px]'
          }`}>
            <div className={`font-black transition-all duration-300 ${
              isScrolled
                ? 'text-sm md:text-xl'
                : 'text-xl md:text-3xl'
            }`}>{String(timeLeft.hours).padStart(2, '0')}</div>
            {!isScrolled && <div className="text-xs font-semibold">שעות</div>}
          </div>
          <div className={`font-black self-center transition-all duration-300 ${
            isScrolled
              ? 'text-sm md:text-xl'
              : 'text-xl md:text-3xl'
          }`}>:</div>
          <div className={`bg-white/20 backdrop-blur rounded text-center transition-all duration-300 ${
            isScrolled
              ? 'px-1 py-0.5 min-w-[35px] md:px-2 md:py-1 md:min-w-[50px]'
              : 'px-2 py-1 min-w-[45px] md:px-4 md:py-2 md:min-w-[70px]'
          }`}>
            <div className={`font-black transition-all duration-300 ${
              isScrolled
                ? 'text-sm md:text-xl'
                : 'text-xl md:text-3xl'
            }`}>{String(timeLeft.minutes).padStart(2, '0')}</div>
            {!isScrolled && <div className="text-xs font-semibold">דקות</div>}
          </div>
          <div className={`font-black self-center transition-all duration-300 ${
            isScrolled
              ? 'text-sm md:text-xl'
              : 'text-xl md:text-3xl'
          }`}>:</div>
          <div className={`bg-white/20 backdrop-blur rounded text-center transition-all duration-300 ${
            isScrolled
              ? 'px-1 py-0.5 min-w-[35px] md:px-2 md:py-1 md:min-w-[50px]'
              : 'px-2 py-1 min-w-[45px] md:px-4 md:py-2 md:min-w-[70px]'
          }`}>
            <div className={`font-black transition-all duration-300 ${
              isScrolled
                ? 'text-sm md:text-xl'
                : 'text-xl md:text-3xl'
            }`}>{String(timeLeft.seconds).padStart(2, '0')}</div>
            {!isScrolled && <div className="text-xs font-semibold">שניות</div>}
          </div>
        </div>

        {!isScrolled && (
          <span className={`font-bold transition-all duration-300 ${
            isScrolled
              ? 'text-xs md:text-base'
              : 'text-sm md:text-lg'
          }`}>עד יום חמישי 9:00 בבוקר</span>
        )}
      </div>
    </div>
  );
}
