import dbConnect from '@/lib/db';
import Fact from '@/models/sattaFact'; // Assuming models are in src/models
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newFact = new Fact(body);
    const savedFact = await newFact.save();
    return NextResponse.json(savedFact, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating fact' }, { status: 500 });
  }
}

export async function GET(request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin');
    let query = {};
    if (admin === '1') {
      query = {};
    } else {
      query = { validation: true };
    }
    const facts = await Fact.find(query).sort({ updatedAt: -1 });
    return NextResponse.json(facts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching facts' }, { status: 500 });
  }
}
