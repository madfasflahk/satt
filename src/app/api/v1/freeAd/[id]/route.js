import dbConnect from '../../../../../lib/db';
import FreeAd from '../../../../../models/freeFreeSattaKingBlank';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    const body = await request.json();
    const updatedFreeAd = await FreeAd.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updatedFreeAd) {
      return NextResponse.json({ message: 'Free Ad not found' }, { status: 404 });
    }
    return NextResponse.json(updatedFreeAd, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating free ad' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    const deletedFreeAd = await FreeAd.findByIdAndDelete(id);
    if (!deletedFreeAd) {
      return NextResponse.json({ message: 'Free Ad not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Delete Successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting free ad' }, { status: 500 });
  }
}
