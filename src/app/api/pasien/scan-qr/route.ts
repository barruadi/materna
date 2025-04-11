import { NextRequest, NextResponse } from 'next/server';
import redis from '../../_shared/redis';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const sessionId = data.sessionId;

  await redis.set(`session:${sessionId}`, JSON.stringify(data))

  return NextResponse.json({ success: true });
}
