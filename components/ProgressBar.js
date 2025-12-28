'use client';

import { useState, useEffect } from 'react';
import { Users, Target, TrendingUp, Share2, Check } from 'lucide-react';
import { getSignatureCount } from '@/lib/actions';

export default function ProgressBar() {
  const [signatureCount, setSignatureCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const INITIAL_COUNT = 782;
  const GOAL = 10000;
  const SHARE_URL = 'https://ibt-seven.vercel.app';

  useEffect(() => {
    fetchCount();
    const interval = setInterval(fetchCount, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchCount = async () => {
    const count = await getSignatureCount();
    setSignatureCount(count);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(SHARE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalCount = INITIAL_COUNT + signatureCount;
  const percentage = Math.min((totalCount / GOAL) * 100, 100);
  const remaining = GOAL - totalCount;

  return (
    <div className="bg-gradient-to-br from-sky-500 via-sky-600 to-blue-700 text-white rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto border-2 border-sky-700 relative overflow-hidden">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.1)_20px,rgba(255,255,255,0.1)_40px)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Target className="w-8 h-8" />
          <h3 className="text-3xl font-black">מצב העצומה</h3>
        </div>

        <p className="text-center text-base font-semibold mb-6 bg-white/10 py-2 px-4 rounded-lg">
          יעד: 10,000 חתימות להשפיע על משרד הבריאות
        </p>

        {/* Numbers */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-4 mb-3">
            <Users className="w-10 h-10" />
            <div className="text-6xl font-black drop-shadow-lg">
              {totalCount.toLocaleString('he-IL')}
            </div>
          </div>
          <div className="text-xl font-bold">
            מתוך <span className="text-yellow-200">{GOAL.toLocaleString('he-IL')}</span> חתימות
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-10 bg-white/20 rounded-full overflow-hidden mb-6 border-2 border-white/30">
          <div
            className="absolute top-0 right-0 h-full bg-gradient-to-l from-green-400 via-green-500 to-emerald-500 transition-all duration-1000 ease-out flex items-center justify-center shadow-lg"
            style={{ width: `${percentage}%` }}
          >
            <span className="text-white font-bold text-base px-3 drop-shadow-md">
              {percentage.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Remaining */}
          <div className="bg-white/15 backdrop-blur rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-bold">נותרו:</span>
            </div>
            <div className="text-3xl font-black text-yellow-200">
              {remaining.toLocaleString('he-IL')}
            </div>
            <p className="text-sm mt-1 opacity-90">חתימות ליעד</p>
          </div>

          {/* Impact message */}
          <div className="bg-white/15 backdrop-blur rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5" />
              <span className="font-bold">ההשפעה שלך:</span>
            </div>
            <p className="text-sm leading-tight font-semibold">
              כל חתימה מחזקת את הלחץ על משרד הבריאות ומגדילה את הסיכוי לביטול הגזירה
            </p>
          </div>
        </div>

        {/* Share section */}
        <div className="bg-white/15 backdrop-blur rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2 mb-3">
            <Share2 className="w-5 h-5" />
            <span className="font-bold text-lg">שתפו את העצומה</span>
          </div>
          <p className="text-sm mb-3">
            שתפו את הקישור בקבוצות ווטסאפ, פייסבוק ורשתות חברתיות
          </p>

          {/* Copy link button */}
          <div className="flex gap-2">
            <input
              type="text"
              value={SHARE_URL}
              readOnly
              className="flex-1 bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-sm font-mono"
            />
            <button
              onClick={copyLink}
              className="bg-white text-sky-700 hover:bg-sky-50 font-bold px-6 py-2 rounded-lg transition-all flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  הועתק!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  העתק
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-4 text-center bg-white/10 py-3 rounded-xl border border-white/20">
          <p className="text-base font-bold">
            הפיצו בקבוצות • גייסו חברים • ביחד נעצור את הגזירה
          </p>
        </div>
      </div>
    </div>
  );
}
