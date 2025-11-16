import dbConnect from '@/lib/db'; // Assuming db.js is in src/lib
import User from '@/models/user'; // Assuming models are in src/models
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const user = new User(body);
    const saveUser = await user.save();
    return NextResponse.json(saveUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
}
