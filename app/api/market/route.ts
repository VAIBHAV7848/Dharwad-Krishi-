import { NextResponse } from 'next/server';
import { MARKET_UPDATES } from '@/lib/mock-data';

export async function GET() {
    // In a real app, this would fetch from a DB or Government API
    return NextResponse.json(MARKET_UPDATES);
}
