

import dbConnect from '../../../../lib/db';
import SattaKingImportantNote from '../../../../models/SattaKingImportantNote';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newNote = new SattaKingImportantNote(body);
    const savedNote = await newNote.save();
    return NextResponse.json(savedNote, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating important note' }, { status: 500 });
  }
}

export async function GET(request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin');
    let query = {};
    if (admin === '1') {
      query = {};
    } else {
      query = { validation: true };
    }
    const notes = await SattaKingImportantNote.find(query);
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching important notes' }, { status: 500 });
  }
}
