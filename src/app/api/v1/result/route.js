import dbConnect from '@/lib/db';
import SattaKingRecordChartjs from '@/models/SattaKingRecordChartjs';
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
      const error = createError(400, "Result list is required");
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    // ---------------------------------------
    // VALIDATE REQUIRED HEADERS
    // ---------------------------------------
    const requiredKeys = [
      "day",
      "delhiLuckyBazar",
      "disawer",
      "faridabad",
      "gaziyabad",
      "kolkataKing",
      "gali",
      "delhiBazar",
      "shreeGanesh",
      "luckpoti",
      "sreeRam",
      "dlb",
    ];

    const hasRequiredKeys = requiredKeys.every((key) => key in resultList[0]);

    if (!hasRequiredKeys) {
      const error = createError(400, "File does not match with expected headings");
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    // ---------------------------------------
    // ADD TIMESTAMP FOR EACH RESULT
    // ---------------------------------------
    for (const result of resultList) {
      const { day } = result;
      result.DateTime = dateToMilliseconds(day, month, year);
    }

    // ---------------------------------------
    // CHECK IF YEAR-MONTH DOCUMENT EXISTS
    // ---------------------------------------
    const existingRecord = await SattaKingRecordChartjs.findOne({
      year,
      month,
    });

    if (existingRecord) {
      // ---------------------------------------
      // UPDATE OR INSERT EACH DAY
      // ---------------------------------------
      for (const result of resultList) {
        const existingDay = existingRecord.resultList.find(
          (entry) => entry.day === result.day
        );

        if (existingDay) {
          // -------- UPDATE SAME DAY --------
          await SattaKingRecordChartjs.updateOne(
            { year, month, "resultList.day": result.day },
            {
              $set: {
                "resultList.$.delhiLuckyBazar": result.delhiLuckyBazar,
                "resultList.$.disawer": result.disawer,
                "resultList.$.faridabad": result.faridabad,
                "resultList.$.gaziyabad": result.gaziyabad,
                "resultList.$.kolkataKing": result.kolkataKing,
                "resultList.$.gali": result.gali,
                "resultList.$.delhiBazar": result.delhiBazar,
                "resultList.$.shreeGanesh": result.shreeGanesh,
                "resultList.$.luckpoti": result.luckpoti,
                "resultList.$.sreeRam": result.sreeRam,
                "resultList.$.dlb": result.dlb,
                "resultList.$.DateTime": result.DateTime,
              },
            }
          );
        } else {
          // -------- INSERT NEW DAY --------
          await SattaKingRecordChartjs.updateOne(
            { year, month },
            { $push: { resultList: result } }
          );
        }
      }
    } else {
      // ---------------------------------------
      // CREATE NEW MONTH DOCUMENT
      // ---------------------------------------
      const newRecord = new SattaKingRecordChartjs({ year, month, resultList });
      await newRecord.save();
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
