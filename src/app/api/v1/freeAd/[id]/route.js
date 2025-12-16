import dbConnect from '../../../../../lib/db';
import FreeAd from '../../../../../models/freeFreeSattaKingBlank';

import { NextResponse } from 'next/server';

export async function PUT(request, context) {
  await dbConnect();

  try {
    // 🔴 FIX: params is async
    const { id } = await context.params;
    console.log(id,'ppppp')
    if (!id) {
      return NextResponse.json(
        { message: "ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updatedFreeAd = await FreeAd.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedFreeAd) {
      return NextResponse.json(
        { message: "Free Ad not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedFreeAd, { status: 200 });

  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { message: "Error updating free ad" },
      { status: 500 }
    );
  }
}


export async function DELETE(request, context) {
  await dbConnect();

  try {
    // 🔴 FIX: params is async
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { message: "ID is required" },
        { status: 400 }
      );
    }

    const deletedFreeAd = await FreeAd.findByIdAndDelete(id);

    if (!deletedFreeAd) {
      return NextResponse.json(
        { message: "Free Ad not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { message: "Error deleting free ad" },
      { status: 500 }
    );
  }
}
