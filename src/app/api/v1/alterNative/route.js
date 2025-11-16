import dbConnect from '@/lib/db';
import SattaKingAlterNative from '@/models/alterNativeSattaKing';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newEntry = new SattaKingAlterNative(body);
    const savedEntry = await newEntry.save();
    return NextResponse.json(savedEntry, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating entry' }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const entries = await SattaKingAlterNative.find();
    return NextResponse.json(entries, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching entries' }, { status: 500 });
  }
}
