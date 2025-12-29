'use server';

import { supabase } from './supabase';

export async function addSignature(formData) {
  try {
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const role = formData.get('role');
    const consentMarketing = formData.get('consentMarketing') === 'on';

    // Basic validation
    if (!fullName || !email || !role) {
      return { error: 'כל השדות חובה' };
    }

    // Insert signature
    const { data, error } = await supabase
      .from('signatures')
      .insert([
        {
          full_name: fullName,
          email: email,
          role: role,
          consent_marketing: consentMarketing,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return { error: 'שגיאה בשמירת החתימה. אנא נסו שוב.' };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error adding signature:', error);
    return { error: 'שגיאה בשמירת החתימה. אנא נסו שוב.' };
  }
}

export async function getSignatureCount() {
  try {
    const { count, error } = await supabase
      .from('signatures')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error getting count:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error getting signature count:', error);
    return 0;
  }
}

export async function verifyAdminPassword(password) {
  try {
    // Admin password - change this to your desired password
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'SaveThePools2024';

    if (password !== ADMIN_PASSWORD) {
      return { success: false };
    }

    // Get signature count
    const count = await getSignatureCount();

    return { success: true, count };
  } catch (error) {
    console.error('Error verifying password:', error);
    return { success: false };
  }
}

export async function getAllSignatures() {
  try {
    let allData = [];
    let from = 0;
    const batchSize = 1000;
    let hasMore = true;

    // Fetch all data in batches to avoid Supabase limits
    while (hasMore) {
      const { data, error } = await supabase
        .from('signatures')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, from + batchSize - 1);

      if (error) {
        console.error('Supabase error:', error);
        return { error: 'שגיאה בקבלת הנתונים. אנא נסה שוב.' };
      }

      if (data && data.length > 0) {
        allData = [...allData, ...data];
        from += batchSize;

        // If we got less than batchSize, we've reached the end
        if (data.length < batchSize) {
          hasMore = false;
        }
      } else {
        hasMore = false;
      }
    }

    return { success: true, data: allData };
  } catch (error) {
    console.error('Error getting signatures:', error);
    return { error: 'שגיאה בקבלת הנתונים. אנא נסה שוב.' };
  }
}
