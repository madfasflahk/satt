import dbConnect from '@/lib/db';
import Fact from '@/models/sattaFact';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    const body = await request.json();
    const updatedFact = await Fact.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updatedFact) {
      return NextResponse.json({ message: 'Fact not found' }, { status: 404 });
    }
    return NextResponse.json(updatedFact, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating fact' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    const deletedFact = await Fact.findByIdAndDelete(id);
    if (!deletedFact) {
      return NextResponse.json({ message: 'Fact not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Delete Successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting fact' }, { status: 500 });
  }
}
