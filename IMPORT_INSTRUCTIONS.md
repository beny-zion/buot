# הוראות להעלאת חתימות מקובץ אקסל

## שלב 1: הרץ את המיגרציה של מסד הנתונים

אם עדיין לא הרצת, הרץ את `migration_final.sql` ב-Supabase SQL Editor.

## שלב 2: וודא שהשרת רץ

פתח טרמינל והרץ:

```bash
cd C:\Users\1\Desktop\בועות\buot-petition
npm run dev
```

השרת צריך לרוץ על http://localhost:3000

## שלב 3: הרץ את סקריפט הייבוא

בטרמינל נפרד, הרץ:

```bash
cd C:\Users\1\Desktop\בועות\buot-petition
python import_phone_signatures.py
```

הסקריפט יבצע:
1. קריאת קובץ האקסל (878 שורות)
2. זיהוי אוטומטי של עמודת "מספר מתקשר"
3. ניקוי וסינון מספרי טלפון
4. הסרת כפילויות
5. שאלה לאישור לפני העלאה
6. העלאה של כל החתימות דרך ה-API
7. דיווח מפורט על הצלחות/כפילויות/שגיאות

## מה הסקריפט עושה:

- **שם**: כל החתימות יהיו עם השם "משתמש טלפוני"
- **טלפון**: מנקה ומנרמל את הפורמט (מוסיף 0, מסיר +972 וכו')
- **Source**: מסמן כ-"phone_ivr"
- **כפילויות**: לא מעלה פעמיים את אותו מספר
- **תקינות**: רק מספרי טלפון ישראליים תקינים (9-10 ספרות)

## בעיות אפשריות:

### 1. שגיאה: "Cannot connect to API"
- וודא שהשרת רץ (`npm run dev`)
- בדוק שה-URL נכון (http://localhost:3000)

### 2. שגיאה: "Unauthorized"
- ודא שה-API_KEY ב-.env.local זהה למה שבסקריפט

### 3. שגיאה: "Missing required fields"
- ייתכן שהמיגרציה לא רצה - הרץ את migration_final.sql

## התאמה אישית:

אם רוצה שם אחר במקום "משתמש טלפוני", ערוך בשורה 74:

```python
def add_signature(phone_number, full_name="השם שלך כאן"):
```

## אחרי ההרצה:

אפשר לבדוק ב-Supabase:

```sql
-- כמה חתימות טלפוניות נוספו
SELECT COUNT(*) FROM signatures WHERE source = 'phone_ivr';

-- הצג את כולן
SELECT * FROM signatures WHERE source = 'phone_ivr' ORDER BY created_at DESC;
```
