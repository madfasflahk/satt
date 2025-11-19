

import dbConnect from '../../../../lib/db';
import FreeAd from '../../../../models/freeFreeSattaKingBlank';
import { getFreeAdsFromDb } from '@/lib/data/freeAd';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newFreeAd = new FreeAd(body);
    const savedFreeAd = await newFreeAd.save();
    return NextResponse.json(savedFreeAd, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating free ad' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin');
    const freeAds = await getFreeAdsFromDb(admin);
    return NextResponse.json(freeAds, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching free ads' }, { status: 500 });
  }
}
