
import dbConnect from '../../../../lib/db';
import ImportantFactAboutSatta from '../../../../models/ImportantFactAboutSatta';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newFact = new ImportantFactAboutSatta(body);
    const savedFact = await newFact.save();
    return NextResponse.json(savedFact, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating important fact' }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const facts = await ImportantFactAboutSatta.find();
    return NextResponse.json(facts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching important facts' }, { status: 500 });
  }
}
