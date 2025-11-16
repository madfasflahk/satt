import dbConnect from '@/lib/db';
import Movement from '@/models/movementText';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newMovement = new Movement(body);
    const savedMovement = await newMovement.save();
    return NextResponse.json(savedMovement, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating movement' }, { status: 500 });
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
    const movements = await Movement.find(query);
    return NextResponse.json(movements, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching movements' }, { status: 500 });
  }
}
