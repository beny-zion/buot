#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
TEST: Import first 3 phone signatures from Excel file
"""

import sys
import io

# Force UTF-8 encoding for console output
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

import pandas as pd
import requests
import os
import json
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env.local')

# Configuration
EXCEL_FILE = r"C:\Users\1\Desktop\בועות\מידע שיחות - הקלטות שיחה .xlsx"
API_URL = "http://localhost:2000/api/signatures"
API_KEY = os.getenv('PHONE_SYSTEM_API_KEY', 'your_secret_api_key_here_change_me_12345')
LIMIT = 3  # Only process first 3 rows for testing

def clean_phone_number(phone):
    """Clean and format phone number to Israeli format"""
    if pd.isna(phone):
        return None

    # Convert to string and remove spaces, dashes, parentheses
    phone_str = str(phone).strip()
    phone_str = phone_str.replace(' ', '').replace('-', '').replace('(', '').replace(')', '')

    # Remove +972 prefix if exists
    if phone_str.startswith('+972'):
        phone_str = '0' + phone_str[4:]
    elif phone_str.startswith('972'):
        phone_str = '0' + phone_str[3:]

    # Remove any non-digit characters
    phone_str = ''.join(c for c in phone_str if c.isdigit())

    # Ensure it starts with 0
    if not phone_str.startswith('0'):
        phone_str = '0' + phone_str

    # Validate length (Israeli phones are 9-10 digits)
    if len(phone_str) < 9 or len(phone_str) > 10:
        print(f"  ⚠️  מספר לא תקין (אורך {len(phone_str)}): {phone_str}")
        return None

    return phone_str

def add_signature(phone_number, full_name="משתמש טלפוני"):
    """Add a single signature via API"""
    payload = {
        "full_name": full_name,
        "phone": phone_number,
        "role": "supporter",
        "source": "phone_ivr",
        "api_key": API_KEY
    }

    print(f"  📤 שולח: {json.dumps(payload, ensure_ascii=False, indent=2)}")

    try:
        response = requests.post(API_URL, json=payload, timeout=10)

        print(f"  📥 תגובה: Status {response.status_code}")
        print(f"  📥 Body: {response.text}")

        if response.status_code == 201:
            return {"success": True, "phone": phone_number}
        elif response.status_code == 409:
            return {"success": False, "phone": phone_number, "error": "כבר קיים"}
        else:
            error_msg = response.json().get('error', 'Unknown error')
            return {"success": False, "phone": phone_number, "error": error_msg}

    except Exception as e:
        print(f"  ❌ חריגה: {e}")
        return {"success": False, "phone": phone_number, "error": str(e)}

def main():
    print("🧪 TEST MODE - מעלה רק 3 שורות ראשונות\n")

    # Check if Excel file exists
    if not Path(EXCEL_FILE).exists():
        print(f"❌ קובץ לא נמצא: {EXCEL_FILE}")
        return

    print(f"📂 קורא קובץ: {EXCEL_FILE}")

    # Read Excel file
    try:
        df = pd.read_excel(EXCEL_FILE)
    except Exception as e:
        print(f"❌ שגיאה בקריאת הקובץ: {e}")
        return

    print(f"📊 נמצאו {len(df)} שורות בקובץ (מעבד רק {LIMIT} ראשונות)")
    print(f"📋 עמודות: {list(df.columns)}\n")

    # Find phone column
    phone_column = None
    possible_names = ['טלפון', 'מספר טלפון', 'phone', 'Phone', 'מס טלפון', 'נייד', 'מספר נייד', 'מספר מתקשר', 'מתקשר']

    for col in df.columns:
        if any(name in str(col) for name in possible_names):
            phone_column = col
            break

    if phone_column is None:
        print("❌ לא נמצאה עמודת טלפון")
        return

    print(f"✅ משתמש בעמודה: '{phone_column}'\n")

    # Take only first LIMIT rows
    df_test = df.head(LIMIT)

    print("📋 השורות שיעובדו:")
    print(df_test[[phone_column]])
    print()

    # Extract and clean phone numbers
    phones_data = []
    for idx, row in df_test.iterrows():
        original = row[phone_column]
        cleaned = clean_phone_number(original)
        phones_data.append({
            'index': idx,
            'original': original,
            'cleaned': cleaned
        })

    print("🔄 ניקוי מספרים:")
    for item in phones_data:
        if item['cleaned']:
            print(f"  ✅ שורה {item['index']}: {item['original']} → {item['cleaned']}")
        else:
            print(f"  ❌ שורה {item['index']}: {item['original']} → לא תקין")
    print()

    # Filter valid phones
    valid_phones = [item['cleaned'] for item in phones_data if item['cleaned']]

    if not valid_phones:
        print("❌ אין מספרים תקינים להעלאה")
        return

    print(f"📞 מספרים תקינים להעלאה: {len(valid_phones)}")
    print()

    # Auto-proceed in test mode
    print("⚠️  TEST MODE - ממשיך אוטומטית...")
    print("\n🚀 מתחיל העלאה...\n")

    # Process signatures
    results = {"success": 0, "duplicate": 0, "error": 0}

    for i, phone in enumerate(valid_phones, 1):
        print(f"[{i}/{len(valid_phones)}] מעלה {phone}")
        print("-" * 60)

        result = add_signature(phone)

        if result["success"]:
            results["success"] += 1
            print("  ✅ הצלחה!\n")
        elif result.get("error") == "כבר קיים":
            results["duplicate"] += 1
            print("  ⚠️  כבר קיים\n")
        else:
            results["error"] += 1
            print(f"  ❌ שגיאה: {result.get('error')}\n")

    # Summary
    print("=" * 60)
    print("📊 סיכום:")
    print(f"  ✅ הצלחה: {results['success']}")
    print(f"  ⚠️  כפילויות: {results['duplicate']}")
    print(f"  ❌ שגיאות: {results['error']}")
    print("=" * 60)

if __name__ == "__main__":
    main()
