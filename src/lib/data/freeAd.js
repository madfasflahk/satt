import dbConnect from '@/lib/db';
import FreeAd from '@/models/freeFreeSattaKingBlank';
import SattaKingResultOrder from '@/models/resultmasterModel';
import SattaKingRecordChartjs from '@/models/SattaKingRecordChartjs';
export async function getFreeAdsFromDb(admin) {
  await dbConnect();
  try {
    let query = {};
    if (admin === '1') {
      query = {};
    } else {
      query = { validation: true };
    }
    const freeAds = await FreeAd.find(query);
    return JSON.parse(JSON.stringify(freeAds)); // Serialize to plain JSON
  } catch (error) {
    console.error('Error fetching free ads from DB:', error);
    throw new Error('Failed to fetch free ads from database');
  }
}
export async function GetResultOrder(admin) {
  await dbConnect();
  try {
    let query = {};
    if (admin === '1') {
      query = {};
    } else {
      query = { validation: true };
    }
    const data = await SattaKingResultOrder.findOne({}, "-_id -__v -createdAt -updatedAt").lean();
    return JSON.parse(JSON.stringify(data));

  } catch (error) {
    console.error('Error fetching free ads from DB:', error);
    throw new Error('Failed to fetch free ads from database');
  }
}

// export async function getCurrentDay(admin) {
//   await dbConnect();
//   try {
//     let query = {};

//     const now = new Date();
//     const year = now.getFullYear().toString();
//     const month = now.getMonth() + 1;
//     const day = now.getDate();

//     const record = await SattaKingRecordChartjs.findOne({
//       year,
//       month,
//       "resultList.day": day
//     });

//     if (!record) {
//       return JSON.parse(JSON.stringify({ message: "No record found for today" }));

//     }

//     const todayResult = record.resultList.find(r => r.day === day);


//     return JSON.parse(JSON.stringify(todayResult)); // Serialize to plain JSON
//   } catch (error) {
//    console.error('Error fetching free ads from DB:', error);
//     throw new Error('Failed to fetch free ads from database');
//   }
// }
