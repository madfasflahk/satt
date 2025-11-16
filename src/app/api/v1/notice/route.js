import dbConnect from '@/lib/db';
import Notice from '@/models/NoticeBoard';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newNotice = new Notice(body);
    const savedNotice = await newNotice.save();
    return NextResponse.json(savedNotice, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating notice' }, { status: 500 });
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
    const notices = await Notice.find(query);
    return NextResponse.json(notices, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching notices' }, { status: 500 });
  }
}
