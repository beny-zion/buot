# תיעוד API למערכת הטלפונית - עצומה נגד ביטול טיפולי הידרותרפיה

## 📋 סקירה כללית

API זה מאפשר למערכת הטלפונית האוטומטית (IVR) להוסיף חתימות לעצומה.

---

## 🔐 אבטחה - API Key

כל בקשה חייבת לכלול `api_key` בגוף הבקשה.

**API Key שלכם:**
```
your_secret_api_key_here_change_me_12345
```

⚠️ **חשוב:** שמרו על ה-API Key בסוד! אל תשתפו אותו באף מקום ציבורי.

---

## 📍 Endpoint Details

### **POST /api/signatures**

הוספת חתימה חדשה מהמערכת הטלפונית.

**URL (בפרודקשן):**
```
https://your-domain.com/api/signatures
```

**URL (בפיתוח):**
```
http://localhost:2000/api/signatures
```

---

## 📥 Request Format

### Headers:
```
Content-Type: application/json
```

### Body Parameters:

| שדה | סוג | חובה? | תיאור | דוגמה |
|-----|-----|-------|-------|-------|
| `api_key` | string | **כן** | מפתח API לאימות | `"your_secret_api_key_here_change_me_12345"` |
| `full_name` | string | **כן** | שם מלא של החותם | `"יוסי כהן"` |
| `phone` | string | **כן** | מספר טלפון (פורמט ישראלי) | `"050-1234567"` או `"0501234567"` |
| `email` | string | לא | אימייל (אופציונלי) | `"yossi@example.com"` |
| `role` | string | לא | תפקיד (ברירת מחדל: `"supporter"`) | `"parent"` / `"patient"` / `"therapist"` / `"supporter"` |
| `source` | string | לא | מקור החתימה (ברירת מחדל: `"phone_ivr"`) | `"phone_ivr"` |

---

## 📤 Response Format

### Success Response (201 Created):
```json
{
  "success": true,
  "message": "Signature added successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "full_name": "יוסי כהן",
    "phone": "050-1234567",
    "email": null,
    "role": "supporter",
    "source": "phone_ivr",
    "created_at": "2025-01-15T10:30:00.000Z"
  }
}
```

### Error Responses:

#### 1. חסר API Key / API Key שגוי (401):
```json
{
  "error": "Unauthorized - Invalid API key"
}
```

#### 2. שדות חסרים (400):
```json
{
  "error": "Missing required fields: full_name and (phone or email)"
}
```

#### 3. מספר טלפון לא תקין (400):
```json
{
  "error": "Invalid phone number format"
}
```

#### 4. כפילות - המספר כבר קיים (409):
```json
{
  "error": "Phone number already exists",
  "code": "DUPLICATE_PHONE"
}
```

#### 5. שגיאת שרת (500):
```json
{
  "error": "Internal server error",
  "details": "..."
}
```

---

## 📝 דוגמאות קוד

### דוגמה 1: Python (Requests)
```python
import requests

url = "https://your-domain.com/api/signatures"
payload = {
    "api_key": "your_secret_api_key_here_change_me_12345",
    "full_name": "יוסי כהן",
    "phone": "050-1234567",
    "role": "parent"
}

response = requests.post(url, json=payload)

if response.status_code == 201:
    print("✅ חתימה נוספה בהצלחה!")
    print(response.json())
elif response.status_code == 409:
    print("⚠️ המספר כבר קיים במערכת")
else:
    print(f"❌ שגיאה: {response.json()}")
```

### דוגמה 2: cURL
```bash
curl -X POST https://your-domain.com/api/signatures \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "your_secret_api_key_here_change_me_12345",
    "full_name": "יוסי כהן",
    "phone": "050-1234567",
    "role": "parent"
  }'
```

### דוגמה 3: JavaScript (Node.js / Fetch)
```javascript
const response = await fetch('https://your-domain.com/api/signatures', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    api_key: 'your_secret_api_key_here_change_me_12345',
    full_name: 'יוסי כהן',
    phone: '050-1234567',
    role: 'parent'
  })
});

const data = await response.json();

if (response.ok) {
  console.log('✅ חתימה נוספה:', data);
} else {
  console.error('❌ שגיאה:', data);
}
```

### דוגמה 4: PHP
```php
<?php
$url = "https://your-domain.com/api/signatures";
$data = array(
    "api_key" => "your_secret_api_key_here_change_me_12345",
    "full_name" => "יוסי כהן",
    "phone" => "050-1234567",
    "role" => "parent"
);

$options = array(
    'http' => array(
        'header'  => "Content-Type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data)
    )
);

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result === FALSE) {
    echo "❌ שגיאה בשליחה";
} else {
    $response = json_decode($result);
    echo "✅ חתימה נוספה: " . json_encode($response);
}
?>
```

---

## 🔍 בדיקת תקינות ה-API

### GET /api/signatures

בדיקה פשוטה שה-API פועל:

```bash
curl https://your-domain.com/api/signatures
```

**תגובה:**
```json
{
  "status": "ok",
  "message": "Phone signature API is running",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

---

## ⚙️ פורמט מספר טלפון

המערכת מקבלת פורמטים הבאים:
- ✅ `050-1234567` (עם מקף)
- ✅ `0501234567` (ללא מקף)
- ✅ `02-1234567` (קווי - 2 ספרות קידומת)
- ✅ `021234567` (קווי ללא מקף)

**לא מקבל:**
- ❌ `+972-50-1234567`
- ❌ `972501234567`
- ❌ `50-1234567` (ללא 0 בהתחלה)

---

## 🚨 טיפול בשגיאות

### מה לעשות במקרה של שגיאה?

1. **401 (Unauthorized)** - בדקו שה-API Key נכון
2. **400 (Bad Request)** - בדקו שכל השדות החובה נשלחים
3. **409 (Duplicate)** - המספר כבר קיים - אפשר לדלג או להציג הודעה למשתמש
4. **500 (Server Error)** - צרו קשר עם צוות הפיתוח

### Retry Logic (מומלץ)

במקרה של שגיאת 500, מומלץ לנסות שוב:
```python
import time

max_retries = 3
for attempt in range(max_retries):
    response = requests.post(url, json=payload)

    if response.status_code == 201:
        break
    elif response.status_code == 500:
        if attempt < max_retries - 1:
            time.sleep(2)  # המתן 2 שניות
            continue
    else:
        # שגיאה אחרת - לא לנסות שוב
        break
```

---

## 📊 Log Example - לצורך Debug

דוגמה ל-log שכדאי לשמור במערכת הטלפונית:

```
[2025-01-15 10:30:15] INFO: Attempting to add signature
[2025-01-15 10:30:15] DEBUG: Name=יוסי כהן, Phone=050-1234567
[2025-01-15 10:30:16] SUCCESS: Signature added - ID=550e8400...
```

או במקרה של כפילות:
```
[2025-01-15 10:30:15] INFO: Attempting to add signature
[2025-01-15 10:30:15] DEBUG: Name=יוסי כהן, Phone=050-1234567
[2025-01-15 10:30:16] WARNING: Duplicate phone number - Skipped
```

---

## 📞 צור קשר

אם יש בעיות או שאלות:
- צרו קשר עם צוות הפיתוח של האתר
- שלחו את ה-logs ודוגמה ל-request שנכשל

---

## ✅ Checklist לפני השקה

- [ ] בדקתם שה-API Key עובד
- [ ] ביצעתם בדיקה עם מספר טלפון אמיתי
- [ ] בדקתם מה קורה במקרה של כפילות
- [ ] יש retry logic למקרה של שגיאות זמניות
- [ ] יש logging מתאים לצורך debug
- [ ] המערכת מתעדת כמה חתימות נוספו בהצלחה

---

**עודכן לאחרונה:** {{ תאריך }}
