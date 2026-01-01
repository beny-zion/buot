#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Import phone signatures from Excel file to Supabase
Reads phone numbers from Excel and adds them to the signatures table
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
API_URL = "http://localhost:2000/api/signatures"  # Change if deployed
API_KEY = os.getenv('PHONE_SYSTEM_API_KEY', 'your_secret_api_key_here_change_me_12345')

def clean_phone_number(phone):
    """
    Clean and format phone number to Israeli format
    """
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

    # Remove any non-digit characters except leading 0
    phone_str = ''.join(c for c in phone_str if c.isdigit())

    # Ensure it starts with 0
    if not phone_str.startswith('0'):
        phone_str = '0' + phone_str

    # Validate length (Israeli phones are 9-10 digits)
    if len(phone_str) < 9 or len(phone_str) > 10:
        return None

    return phone_str

def add_signature(phone_number, full_name="משתמש טלפוני"):
    """
    Add a single signature via API
    """
    payload = {
        "full_name": full_name,
        "phone": phone_number,
        "role": "supporter",
        "source": "phone_ivr",
        "api_key": API_KEY
    }

    try:
        response = requests.post(API_URL, json=payload, timeout=10)

        if response.status_code == 201:
            return {"success": True, "phone": phone_number}
        elif response.status_code == 409:
            # Duplicate - already exists
            return {"success": False, "phone": phone_number, "error": "כבר קיים"}
        else:
            error_msg = response.json().get('error', 'Unknown error')
            return {"success": False, "phone": phone_number, "error": error_msg}

    except Exception as e:
        return {"success": False, "phone": phone_number, "error": str(e)}

def main():
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

    print(f"📊 נמצאו {len(df)} שורות בקובץ")
    print(f"📋 עמודות: {list(df.columns)}")

    # Try to find phone column (common Hebrew names)
    phone_column = None
    possible_names = ['מספר מתקשר', 'טלפון', 'מספר טלפון', 'phone', 'Phone', 'מס טלפון', 'נייד', 'מספר נייד', 'מתקשר']

    for col in df.columns:
        if any(name in str(col) for name in possible_names):
            phone_column = col
            break

    if phone_column is None:
        print("\n❓ לא נמצאה עמודת טלפון אוטומטית.")
        print("עמודות זמינות:")
        for i, col in enumerate(df.columns):
            print(f"  {i}: {col}")

        choice = input("\nהזן מספר עמודה (או שם): ").strip()

        if choice.isdigit():
            phone_column = df.columns[int(choice)]
        else:
            phone_column = choice

    print(f"\n✅ משתמש בעמודה: {phone_column}")

    # Extract and clean phone numbers
    phones = df[phone_column].apply(clean_phone_number)
    phones = phones.dropna().unique()  # Remove duplicates

    print(f"📞 נמצאו {len(phones)} מספרי טלפון ייחודיים")

    # Confirm before proceeding
    print(f"\n⚠️  עומד להוסיף {len(phones)} חתימות עם השם 'משתמש טלפוני'")
    confirm = input("האם להמשיך? (y/n): ").strip().lower()

    if confirm != 'y':
        print("❌ בוטל על ידי המשתמש")
        return

    # Process signatures
    results = {
        "success": 0,
        "duplicate": 0,
        "error": 0,
        "errors": []
    }

    print("\n🚀 מתחיל להעלות חתימות...\n")

    for i, phone in enumerate(phones, 1):
        print(f"[{i}/{len(phones)}] מעלה {phone}...", end=" ")

        result = add_signature(phone)

        if result["success"]:
            results["success"] += 1
            print("✅")
        elif result.get("error") == "כבר קיים":
            results["duplicate"] += 1
            print("⚠️ כבר קיים")
        else:
            results["error"] += 1
            results["errors"].append(result)
            print(f"❌ {result.get('error', 'Unknown')}")

    # Summary
    print("\n" + "="*50)
    print("📊 סיכום:")
    print(f"  ✅ הצלחה: {results['success']}")
    print(f"  ⚠️  כפילויות (כבר קיימים): {results['duplicate']}")
    print(f"  ❌ שגיאות: {results['error']}")

    if results["errors"]:
        print("\n🔍 פירוט שגיאות:")
        for err in results["errors"][:10]:  # Show first 10
            print(f"  - {err['phone']}: {err['error']}")

        if len(results["errors"]) > 10:
            print(f"  ... ועוד {len(results['errors']) - 10} שגיאות")

    print("="*50)

if __name__ == "__main__":
    main()
