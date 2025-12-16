
import dbConnect from '../../../../lib/db';
import SattaKingRecordChartjs from '../../../../models/SattaKingRecordChartjs';

import createError from '@/util/createError';
import { NextResponse } from 'next/server';

function dateToMilliseconds(day, month, year) {
  const dateString = `${year}-${month}-${day}`;
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  const indianTimeString = date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const indianDate = new Date(indianTimeString);
  return indianDate.getTime();
}
const normalizeResult = (result) => ({
  day: result.day,
  DateTime: result.DateTime,

  delhiLuckyBazar: result["Delhi Lucky Bazar"]?.trim() ?? "",
  disawer: result["Disawer"]?.trim() ?? "",
  faridabad: result["Faridabad"]?.trim() ?? "",
  gaziyabad: result["Gaziyabad"]?.trim() ?? "",
  kolkataKing: result["Kolkata King"]?.trim() ?? "",
  gali: result["Gali"]?.trim() ?? "",
  delhiBazar: result["Delhi Bazar"]?.trim() ?? "",
  shreeGanesh: result["Shree Ganesh"]?.trim() ?? "",
  luckpoti: result["Luckpoti"]?.trim() ?? "",
  sreeRam: result["Sree Ram"]?.trim() ?? "",
  dlb: result["DLB"]?.trim() ?? "",
});


export async function POST(request) {
  await dbConnect();

  try {
    const { year, month, resultList } = await request.json();

    // 🔴 Basic validation
    if (!year || !month || !Array.isArray(resultList) || resultList.length === 0) {
      return NextResponse.json(
        { message: "Year, month and resultList are required" },
        { status: 400 }
      );
    }

    if (!("day" in resultList[0])) {
      return NextResponse.json(
        { message: "'day' field is required in resultList" },
        { status: 400 }
      );
    }

    // 🔹 Normalize + add DateTime
    const normalizedResultList = resultList.map((result) =>
      normalizeResult({
        ...result,
        DateTime: dateToMilliseconds(result.day, month, year),
      })
    );

    // 🔹 Find existing month record
    const existingRecord = await SattaKingRecordChartjs.findOne({ year, month });

    if (existingRecord) {
      // 🔹 Update or insert day-wise results
      for (const result of normalizedResultList) {
        const existingDay = existingRecord.resultList.find(
          (entry) => entry.day === result.day
        );

        if (existingDay) {
          Object.assign(existingDay, result);
        } else {
          existingRecord.resultList.push(result);
        }
      }

      // 🔹 Important for nested updates
      existingRecord.markModified("resultList");
      await existingRecord.save();
    } else {
      // 🔹 Create new record
      await SattaKingRecordChartjs.create({
        year,
        month,
        resultList: normalizedResultList,
      });
    }

    return NextResponse.json(
      { message: "Record updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Result save error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);

    const yearParam = searchParams.get("year");
    const monthParam = searchParams.get("month");

    // 🚫 ignore service worker & invalid calls
    if (!yearParam || yearParam.includes(".js")) {
      const data = await SattaKingRecordChartjs.find()
        .sort({ updatedAt: -1 })
        .lean();

      return NextResponse.json(data, { status: 200 });
    }

    const yearNumber = Number(yearParam);
    const month = monthParam ? Number(monthParam) : null;

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    /* ======================
       year + month
    ======================= */
    if (!isNaN(yearNumber) && month !== null) {
      const chart = await SattaKingRecordChartjs.findOne({
        $or: [{ year: yearNumber }, { year: yearParam }],
        month: month
      }).lean();

      return NextResponse.json(chart, { status: 200 });
    }

    /* ======================
       default listing
    ======================= */
    const chart = await SattaKingRecordChartjs.find({
      $or: [{ year: yearNumber }, { year: yearParam }]
    })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json(chart, { status: 200 });

  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}