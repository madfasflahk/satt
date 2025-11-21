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
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const admin = searchParams.get("admin");

    let facts;
    if (admin) {
      facts = await ImportantFactAboutSatta.find();
    } else {
      facts = await ImportantFactAboutSatta.find({ validation: true });
    }
    console.log(facts);
    return NextResponse.json(facts, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/v1/fact:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

