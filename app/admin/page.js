'use client';

import { useState } from 'react';
import { verifyAdminPassword, getAllSignatures } from '@/lib/actions';
import { Download, Lock, Loader2, CheckCircle2, Users } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [signatureCount, setSignatureCount] = useState(0);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await verifyAdminPassword(password);

    if (result.success) {
      setIsAuthenticated(true);
      setSignatureCount(result.count);
    } else {
      setError('סיסמה שגויה. אנא נסה שוב.');
    }

    setIsLoading(false);
  };

  const handleExport = async () => {
    setIsExporting(true);
    setError('');

    try {
      const result = await getAllSignatures();

      if (result.error) {
        setError(result.error);
        setIsExporting(false);
        return;
      }

      // Prepare data for Excel
      const excelData = result.data.map((signature, index) => ({
        'מספר': index + 1,
        'שם מלא': signature.full_name,
        'אימייל': signature.email,
        'תפקיד': getRoleInHebrew(signature.role),
        'הסכמה לשיווק': signature.consent_marketing ? '✓ כן' : '✗ לא',
        'תאריך חתימה': new Date(signature.created_at).toLocaleString('he-IL', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
      }));

      // Create workbook
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'חתימות');

      // Set column widths
      worksheet['!cols'] = [
        { wch: 8 },  // מספר
        { wch: 25 }, // שם מלא
        { wch: 30 }, // אימייל
        { wch: 20 }, // תפקיד
        { wch: 15 }, // הסכמה לשיווק
        { wch: 20 }, // תאריך חתימה
      ];

      // Generate filename with current date
      const now = new Date();
      const dateStr = now.toLocaleDateString('he-IL').replace(/\./g, '-');
      const filename = `חתימות-עצומה-${dateStr}.xlsx`;

      // Download file
      XLSX.writeFile(workbook, filename);
    } catch (err) {
      console.error('Export error:', err);
      setError('שגיאה בייצוא הקובץ. אנא נסה שוב.');
    }

    setIsExporting(false);
  };

  const getRoleInHebrew = (role) => {
    const roles = {
      parent: 'הורה לילד/ה מטופל/ת',
      patient: 'מטופל/ת',
      therapist: 'מטפל/ת',
      supporter: 'תומך/ת',
    };
    return roles[role] || role;
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-50 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="bg-sky-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-sky-600" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">כניסה למערכת ניהול</h1>
            <p className="text-gray-600">הזן סיסמת מנהל לגישה לנתונים</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-lg font-bold text-gray-700 mb-2">
                סיסמה
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-lg transition-all"
                placeholder="הזן סיסמת מנהל"
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-gray-400 text-white font-bold text-xl py-4 px-6 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>מתחבר...</span>
                </>
              ) : (
                <>
                  <Lock className="w-6 h-6" />
                  <span>התחבר</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-50 p-4 md:p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white p-6 md:p-8">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-black">לוח בקרה - ניהול עצומה</h1>
            </div>
            <p className="text-sky-100">ייצוא ונתוח נתוני החתימות</p>
          </div>

          {/* Stats */}
          <div className="p-6 md:p-8 bg-sky-50 border-b-2 border-sky-100">
            <div className="flex items-center justify-center gap-4">
              <Users className="w-12 h-12 text-sky-600" />
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black text-sky-700">
                  {signatureCount.toLocaleString('he-IL')}
                </div>
                <div className="text-lg md:text-xl text-gray-700 font-semibold mt-1">
                  סך הכל חתימות במערכת
                </div>
              </div>
            </div>
          </div>

          {/* Export Section */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-4">ייצוא נתונים לאקסל</h2>
            <p className="text-gray-600 mb-6">
              הורד את כל רשימת החתימות בקובץ Excel עם כל הפרטים: שם מלא, אימייל, תפקיד, הסכמה לשיווק ותאריך חתימה.
            </p>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
                {error}
              </div>
            )}

            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold text-xl py-4 px-6 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-7 h-7 animate-spin" />
                  <span>מייצא נתונים...</span>
                </>
              ) : (
                <>
                  <Download className="w-7 h-7" />
                  <span>הורד קובץ Excel</span>
                </>
              )}
            </button>

            <div className="mt-6 bg-sky-50 border-2 border-sky-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">הקובץ כולל:</h3>
              <ul className="space-y-1 text-gray-700 text-sm md:text-base">
                <li>✓ מספר רץ לכל חתימה</li>
                <li>✓ שם מלא</li>
                <li>✓ כתובת אימייל</li>
                <li>✓ תפקיד (הורה/מטופל/מטפל/תומך)</li>
                <li>✓ הסכמה לשיווק (✓ כן / ✗ לא)</li>
                <li>✓ תאריך ושעת החתימה</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="text-center mt-6">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sky-600 hover:text-sky-700 font-semibold underline"
          >
            התנתק
          </button>
        </div>
      </div>
    </div>
  );
}
