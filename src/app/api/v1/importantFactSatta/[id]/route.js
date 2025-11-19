
import dbConnect from '../../../../../lib/db';
import ImportantFactAboutSatta from '../../../../../models/ImportantFactAboutSatta';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    const body = await request.json();
    const updatedFact = await ImportantFactAboutSatta.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updatedFact) {
      return NextResponse.json({ message: 'Important Fact not found' }, { status: 404 });
    }
    return NextResponse.json(updatedFact, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating important fact' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    const deletedFact = await ImportantFactAboutSatta.findByIdAndDelete(id);
    if (!deletedFact) {
      return NextResponse.json({ message: 'Important Fact not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'delete successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting important fact' }, { status: 500 });
  }
}
