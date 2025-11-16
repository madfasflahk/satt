import dbConnect from '@/lib/db';
import SattaKingImportantNote from '@/models/SattaKingImportantNote';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    const body = await request.json();
    const updatedNote = await SattaKingImportantNote.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updatedNote) {
      return NextResponse.json({ message: 'Important Note not found' }, { status: 404 });
    }
    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating important note' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    const deletedNote = await SattaKingImportantNote.findByIdAndDelete(id);
    if (!deletedNote) {
      return NextResponse.json({ message: 'Important Note not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'delete successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting important note' }, { status: 500 });
  }
}
