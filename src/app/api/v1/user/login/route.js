import dbConnect from '@/lib/db';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import createError from '@/util/createError'; // Assuming createError is in src/util

export async function POST(request) {
  await dbConnect();
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email });

    if (!user) {
      const error = createError(404, "User not found");
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    if (user.password !== password) {
      const error = createError(405, "Password invalid");
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    const token = jwt.sign({ id: user._id, userMail: user.email }, process.env.jWT_SECRET);

    return NextResponse.json({
      fullName: user.fullName,
      role: user.role,
      email: user.email,
      id: user._id,
      token: `Bearer ${token}`,
    }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error during login' }, { status: 500 });
  }
}
