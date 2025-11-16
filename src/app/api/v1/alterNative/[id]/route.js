import dbConnect from "@/lib/db";
import SattaKingAlterNative from "@/models/alterNativeSattaKing";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  await dbConnect();

  try {
    const { id } = params;
    const body = await request.json();

    const updatedEntry = await SattaKingAlterNative.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!updatedEntry) {
      return NextResponse.json({ message: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json(updatedEntry, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating entry" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();

  try {
    const { id } = params;

    const deletedEntry = await SattaKingAlterNative.findByIdAndDelete(id);

    if (!deletedEntry) {
      return NextResponse.json({ message: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Delete successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting entry" },
      { status: 500 }
    );
  }
}
