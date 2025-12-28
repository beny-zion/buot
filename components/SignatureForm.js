'use client';

import { useState, useEffect } from 'react';
import { addSignature, getSignatureCount } from '@/lib/actions';
import { Users, CheckCircle2, Loader2 } from 'lucide-react';

export default function SignatureForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [signatureCount, setSignatureCount] = useState(0);
  const INITIAL_COUNT = 782;

  useEffect(() => {
    // Fetch initial count
    fetchCount();

    // Update count every 5 seconds
    const interval = setInterval(fetchCount, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchCount = async () => {
    const count = await getSignatureCount();
    setSignatureCount(count);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.target);
    const result = await addSignature(formData);

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
    } else {
      setShowSuccess(true);
      e.target.reset();
      fetchCount();
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto text-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h3 className="text-3xl font-black text-gray-900 mb-4">תודה רבה!</h3>
        <p className="text-xl text-gray-700 mb-6">חתימתך נקלטה במערכת</p>

        <div className="bg-sky-50 border-2 border-sky-200 rounded-xl p-6 mb-6">
          <p className="text-lg font-bold text-gray-900 mb-4">עכשיו - שתפו בווצאפ!</p>
          <p className="text-gray-700 mb-4">ככל שיותר אנשים יחתמו, כך הסיכוי שלנו להצליח גדל</p>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              'אסור לתת לזה לקרות! משרד הבריאות מקצץ בטיפולי הידרותרפיה בבריכות טיפוליות לילדים עם צרכים מיוחדים. חתמתי עכשיו, תחתמו גם אתם: ' +
                window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            שתפו בווצאפ עכשיו
          </a>
        </div>

        <button
          onClick={() => setShowSuccess(false)}
          className="text-sky-600 hover:text-sky-700 font-semibold underline"
        >
          חזרה לעמוד הראשי
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto" id="sign-form">
      {/* Signature counter */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-700 text-white rounded-xl p-6 mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Users className="w-8 h-8" />
          <span className="text-5xl font-black">{(INITIAL_COUNT + signatureCount).toLocaleString('he-IL')}</span>
        </div>
        <p className="text-xl font-semibold">אנשים כבר הצטרפו למאבק!</p>
      </div>

      <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">אני מתנגד/ת לגזירה!</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-lg font-bold text-gray-700 mb-2">
            שם מלא *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-lg transition-all"
            placeholder="הזינו את שמכם המלא"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-lg font-bold text-gray-700 mb-2">
            כתובת מייל *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-lg transition-all"
            placeholder="example@email.com"
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-lg font-bold text-gray-700 mb-2">
            אני *
          </label>
          <select
            id="role"
            name="role"
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-lg transition-all"
          >
            <option value="">בחרו...</option>
            <option value="parent">הורה לילד/ה מטופל/ת</option>
            <option value="patient">מטופל/ת</option>
            <option value="therapist">מטפל/ת</option>
            <option value="supporter">תומך/ת</option>
          </select>
        </div>

        {/* Marketing consent */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consentMarketing"
            name="consentMarketing"
            className="mt-1 w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
          />
          <label htmlFor="consentMarketing" className="text-sm text-gray-700">
            אני מסכים/ה לקבל עדכונים מאיגוד הבריכות הטיפוליות על התקדמות המאבק
          </label>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-black text-2xl py-5 px-8 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-xl disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-7 h-7 animate-spin" />
              <span>שולח...</span>
            </>
          ) : (
            'חתמו עכשיו!'
          )}
        </button>
      </form>
    </div>
  );
}
