import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import SattaKingRecordChartjs from '../../../../models/SattaKingRecordChartjs';

export async function GET() {
  await dbConnect();
    
  try {
    // Get current date in IST (UTC+5:30)
    const now = new Date();
    
    // Option 1: Adjust for IST (if server is in UTC)
    // const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    // const istDate = new Date(now.getTime() + istOffset);
    // Use istDate instead of now below
    
    // Option 2: Use server's local time (if server is already in IST)
    const istDate = now;
    
    const currentYear = istDate.getFullYear().toString(); // "2025"
    const currentMonth = istDate.getMonth() + 1; // 12
    const currentDay = istDate.getDate(); // 16
    
    
    
    const record = await SattaKingRecordChartjs.findOne({
      year: currentYear,
      month: currentMonth
    }).lean();
    
    if (!record) {
      return NextResponse.json(
        { 
          message: `No monthly record found`,
          year: currentYear,
          month: currentMonth
        },
        { status: 404 }
      );
    }
   
    const todayResult = record.resultList.find(r => r.day === currentDay);

    if (!todayResult) {
      // Return empty result with proper structure
      return NextResponse.json({
        message: "No result for today yet",
        day: currentDay,
        month: currentMonth,
        year: currentYear,
        // Include all fields with null/empty values
        delhiLuckyBazar: null,
        disawer: null,
        faridabad: null,
        gaziyabad: null,
        kolkataKing: null,
        gali: null,
        delhiBazar: null,
        shreeGanesh: null,
        luckpoti: null,
        sreeRam: null,
        dlb: null
      }, { status: 200 });
    }

    return NextResponse.json(todayResult, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}