import dbConnect from '@/lib/db';
import SattaKingRecordChartjs from '@/models/SattaKingRecordChartjs';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    const record = await SattaKingRecordChartjs.findOne({
      year,
      month,
      "resultList.day": day
    });

    if (!record) {
      return NextResponse.json({ message: "No record found for today" }, { status: 404 });
    }

    const todayResult = record.resultList.find(r => r.day === day);

    return NextResponse.json(todayResult, { status: 200 });
  } catch (error) {
    console.error("Error fetching current day data:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
