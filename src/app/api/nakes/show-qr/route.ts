import { NextRequest, NextResponse } from 'next/server';
import redis from '../../_shared/redis';

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('session');

    if (!sessionId) {
      return NextResponse.json({ received: false, error: 'No session ID' }, { status: 400 });
    }

    const raw = await redis.get(`session:${sessionId}`);
    if (!raw) {
      return NextResponse.json({ received: false });
    }

    const data = JSON.parse(raw);
    return NextResponse.json({ received: true, data });
  } catch (err) {
    console.error('Error in show-qr:', err);
    return NextResponse.json({ received: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
