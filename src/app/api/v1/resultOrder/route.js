import dbConnect from '@/lib/db';
import SattaKingResultOrder from '@/models/resultmasterModel';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json(); // body = object with all markets

    const updatedDoc = await SattaKingResultOrder.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true }
    );

    return NextResponse.json(updatedDoc, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const data = await SattaKingResultOrder.findOne({}, "-_id -__v -createdAt -updatedAt").lean();

    return NextResponse.json(data || {}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
