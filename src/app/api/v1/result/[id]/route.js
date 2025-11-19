
import dbConnect from '../../../../../lib/db';
import SattaKingRecordChartjs from '../../../../../models/SattaKingRecordChartjs';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    const deletedRecord = await SattaKingRecordChartjs.findByIdAndDelete(id);
    if (!deletedRecord) {
      return NextResponse.json({ message: 'Record not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'success Fully Deleted' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting record' }, { status: 500 });
  }
}
