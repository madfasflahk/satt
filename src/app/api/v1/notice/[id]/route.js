import dbConnect from '../../../../../lib/db';
import NoticeBoard from '../../../../../models/NoticeBoard';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    const body = await request.json();
    const updatedNotice = await Notice.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updatedNotice) {
      return NextResponse.json({ message: 'Notice not found' }, { status: 404 });
    }
    return NextResponse.json(updatedNotice, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating notice' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    const deletedNotice = await Notice.findByIdAndDelete(id);
    if (!deletedNotice) {
      return NextResponse.json({ message: 'Notice not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'delete successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting notice' }, { status: 500 });
  }
}
