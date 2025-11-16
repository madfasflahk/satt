import dbConnect from '@/lib/db';
import Movement from '@/models/movementText';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    const body = await request.json();
    const updatedMovement = await Movement.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updatedMovement) {
      return NextResponse.json({ message: 'Movement not found' }, { status: 404 });
    }
    return NextResponse.json(updatedMovement, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating movement' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    const deletedMovement = await Movement.findByIdAndDelete(id);
    if (!deletedMovement) {
      return NextResponse.json({ message: 'Movement not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'delete successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting movement' }, { status: 500 });
  }
}
