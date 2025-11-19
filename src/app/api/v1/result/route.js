
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



export async function POST(request) {
  await dbConnect();

  try {
    const { year, month, resultList } = await request.json();

    console.log("Received resultList:", resultList);

    if (!resultList || resultList.length === 0) {
      return NextResponse.json(
        { message: "Result list is required" },
        { status: 400 }
      );
    }

    // ---- Validate only day ----
    if (!("day" in resultList[0])) {
      return NextResponse.json(
        { message: "'day' field is required" },
        { status: 400 }
      );
    }

    // ----- Add timestamp to each result -----
    for (const result of resultList) {
      result.DateTime = dateToMilliseconds(result.day, month, year);
    }

    const existingRecord = await SattaKingRecordChartjs.findOne({ year, month });

    if (existingRecord) {
      // ---- Update or Insert ----
      for (const result of resultList) {
        const existingDay = existingRecord.resultList.find(
          (entry) => entry.day === result.day
        );

        if (existingDay) {
          // -------- PARTIAL UPDATE --------
          for (const key in result) {
            if (result[key] !== undefined) {
              existingDay[key] = result[key];
            }
          }
        } else {
          // new day insert
          existingRecord.resultList.push(result);
        }
      }

      await existingRecord.save();
    } else {
      // Create new month doc
      await SattaKingRecordChartjs.create({ year, month, resultList });
    }

    return NextResponse.json("Record updated successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET(request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const month = parseInt(searchParams.get('month'));
    let page = parseInt(searchParams.get('page')) || 1;
    let limit = parseInt(searchParams.get('limit')) || 10;
    let skip = (page - 1) * limit;

    if (year && month) {
        const chart = await SattaKingRecordChartjs.findOne({ year: year, month: month });
        return NextResponse.json(chart, { status: 200 });
    } else {
        const chart = await SattaKingRecordChartjs.find().sort({ updatedAt: -1 }).select('-statusHistory -Comment')
            .skip(skip)
            .limit(limit)
            .exec();
        return NextResponse.json(chart, { status: 200 });
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
