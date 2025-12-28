# מדריך הגדרת Supabase לפרויקט "מצילים את הבועות"

## שלב 1: יצירת חשבון ופרויקט ב-Supabase

1. היכנסו לאתר [https://supabase.com](https://supabase.com)
2. לחצו על "Start your project" או "Sign Up"
3. הירשמו באמצעות GitHub (מומלץ) או Email
4. לאחר ההתחברות, לחצו על "New Project"
5. בחרו שם לפרויקט (למשל: `buot-petition`)
6. הגדירו סיסמת Database (שמרו אותה במקום בטוח!)
7. בחרו Region קרוב לישראל (מומלץ: `Europe West (London)` או `Europe Central (Frankfurt)`)
8. בחרו בתכנית Free (מספיק לפרויקט זה)
9. לחצו "Create new project"

**המתינו 1-2 דקות עד שהפרויקט יסיים להיווצר.**

---

## שלב 2: יצירת טבלת החתימות (signatures)

1. בתפריט הצד, לחצו על "SQL Editor"
2. לחצו על "New Query"
3. העתיקו והדביקו את הקוד הבא:

```sql
-- יצירת טבלת signatures
CREATE TABLE signatures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('parent', 'therapist', 'supporter')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_verified BOOLEAN DEFAULT FALSE,
  consent_marketing BOOLEAN DEFAULT FALSE
);

-- יצירת אינדקס על תאריך יצירה (לשאילתות מהירות)
CREATE INDEX idx_signatures_created_at ON signatures(created_at DESC);

-- יצירת אינדקס על email (לבדיקת כפילויות)
CREATE INDEX idx_signatures_email ON signatures(email);

-- הפעלת Row Level Security (אבטחה)
ALTER TABLE signatures ENABLE ROW LEVEL SECURITY;

-- מדיניות: כולם יכולים לקרוא (למונה החתימות)
CREATE POLICY "Anyone can read signatures count" ON signatures
  FOR SELECT
  USING (true);

-- מדיניות: כולם יכולים להוסיף חתימות
CREATE POLICY "Anyone can insert signatures" ON signatures
  FOR INSERT
  WITH CHECK (true);

-- הצגת הצלחה
SELECT 'Table created successfully!' as status;
```

4. לחצו על "Run" (או F5)
5. וודאו שאתם רואים הודעה: `Table created successfully!`

---

## שלב 3: קבלת פרטי החיבור (API Keys)

1. בתפריט הצד, לחצו על "Settings" (הגלגל השיניים למטה)
2. לחצו על "API"
3. תראו שני ערכים חשובים:
   - **Project URL** - זה ה-`NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key - זה ה-`NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. העתיקו את שני הערכים האלה

---

## שלב 4: הגדרת משתני סביבה בפרויקט

1. בתיקיית הפרויקט, צרו קובץ בשם `.env.local` (בדיוק כמו `.env.local.example` אבל בלי `example`)
2. פתחו את הקובץ ב-VSCode או עורך טקסט
3. הדביקו את התוכן הבא והחליפו את הערכים שלכם:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. שמרו את הקובץ

---

## שלב 5: בדיקת החיבור

1. פתחו טרמינל בתיקיית הפרויקט
2. הריצו את הפקודה:

```bash
npm run dev
```

3. פתחו דפדפן וגשו ל-[http://localhost:3000](http://localhost:3000)
4. האתר אמור להיטען תקין
5. נסו למלא את טופס ההחתמה ולשלוח
6. אם הכל עובד - תקבלו הודעת "תודה רבה!"

---

## שלב 6: בדיקת הנתונים ב-Supabase

1. חזרו ל-Supabase Dashboard
2. לחצו על "Table Editor" בתפריט הצד
3. בחרו בטבלה `signatures`
4. אתם אמורים לראות את החתימה שהכנסתם באתר!

---

## פתרון בעיות נפוצות

### שגיאה: "Failed to fetch"
- וודאו שהעתקתם נכון את ה-URL וה-API Key
- בדקו שאין רווחים מיותרים ב-`.env.local`
- נסו לעצור את השרת (`Ctrl+C`) ולהריץ שוב `npm run dev`

### שגיאה: "relation signatures does not exist"
- חזרו לשלב 2 ווודאו שהרצתם את כל ה-SQL
- בדקו ב-"Table Editor" שהטבלה `signatures` קיימת

### החתימות לא נשמרות
- בדקו ב-"SQL Editor" שה-Row Level Security Policies הוגדרו
- הריצו את השאילתה: `SELECT * FROM signatures LIMIT 5;`
- אם אתם רואים שגיאה - הרצו שוב את שלב 2

---

## הערות אבטחה

- **אל תשתפו** את קובץ `.env.local` עם אף אחד
- **אל תעלו** את `.env.local` ל-GitHub (הקובץ כבר ב-`.gitignore`)
- ה-`anon key` בטוח לשימוש בצד לקוח כי יש לו הרשאות מוגבלות
- אם בטעות חשפתם את ה-API Key, אפשר ליצור אחד חדש ב-Settings > API

---

## תמיכה נוספת

אם נתקעתם, בדקו את:
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

בהצלחה! 🎉
