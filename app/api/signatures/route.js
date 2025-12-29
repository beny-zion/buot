import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { full_name, phone, email, role, source, api_key } = body;

    // API Key validation (for security)
    const validApiKey = process.env.PHONE_SYSTEM_API_KEY;
    if (!validApiKey || api_key !== validApiKey) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid API key' },
        { status: 401 }
      );
    }

    // Validation - need at least name and phone OR email
    if (!full_name || (!phone && !email)) {
      return NextResponse.json(
        { error: 'Missing required fields: full_name and (phone or email)' },
        { status: 400 }
      );
    }

    // Phone validation (Israeli format)
    if (phone) {
      const phoneRegex = /^0\d{1,2}-?\d{7}$/;
      if (!phoneRegex.test(phone)) {
        return NextResponse.json(
          { error: 'Invalid phone number format' },
          { status: 400 }
        );
      }
    }

    // Email validation (if provided)
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }
    }

    // Insert signature
    const { data, error } = await supabase
      .from('signatures')
      .insert([
        {
          full_name: full_name,
          phone: phone || null,
          email: email || null,
          role: role || 'supporter',
          source: source || 'phone_ivr',
          consent_marketing: false,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);

      // Handle duplicate phone/email
      if (error.code === '23505') {
        if (error.message.includes('phone')) {
          return NextResponse.json(
            { error: 'Phone number already exists', code: 'DUPLICATE_PHONE' },
            { status: 409 }
          );
        }
        if (error.message.includes('email')) {
          return NextResponse.json(
            { error: 'Email already exists', code: 'DUPLICATE_EMAIL' },
            { status: 409 }
          );
        }
      }

      return NextResponse.json(
        { error: 'Failed to save signature', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Signature added successfully',
        data: data[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// GET endpoint to verify API is working
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      message: 'Phone signature API is running',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
