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
