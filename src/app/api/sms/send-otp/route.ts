// app/api/sms/send-otp/route.ts
import { NextResponse } from 'next/server';
import phoneAttemptStore from '@/lib/phoneAttemptStore';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { phone } = await req.json().catch(() => ({} as { phone?: string }));
  if (!phone) {
    return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
  }

  const normalized = String(phone).trim();

  const sid = process.env.TWILIO_ACCOUNT_SID!;
  const token = process.env.TWILIO_AUTH_TOKEN!;
  const verifySid = process.env.TWILIO_VERIFY_SID!;
  const twilio = (await import('twilio')).default(sid, token);

  try {
    await twilio.verify.v2
      .services(verifySid)
      .verifications.create({
        to: normalized, // e.g. +447911123456
        channel: 'sms',
      });

    // ✅ Reset attempts & lock on (re)send so user gets a clean slate for this code
    phoneAttemptStore[normalized] = { attempts: 0, lockedUntil: null };

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Verify send error:', err);
    // Provide cleaner messages for common Twilio errors
    const twilioErr = err as { message?: string; code?: number };
    const msg =
      twilioErr?.message ||
      (twilioErr?.code === 20003
        ? 'Authentication error with SMS provider'
        : 'Failed to send OTP');
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
