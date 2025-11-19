import dbConnect from "../../../../../lib/db";
import Fact from "../../../../../models/sattaFact";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const fact = await Fact.findById(id);
    if (!fact) {
      return NextResponse.json({ message: "Fact not found" }, { status: 404 });
    }
    return NextResponse.json(fact, { status: 200 });
  } catch (error) {
    console.error(`Error in GET /api/v1/fact/[id]:`, error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await req.json();
    const updatedFact = await Fact.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedFact) {
      return NextResponse.json({ message: "Fact not found" }, { status: 404 });
    }
    return NextResponse.json(updatedFact, { status: 200 });
  } catch (error) {
    console.error(`Error in PUT /api/v1/fact/[id]:`, error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const deletedFact = await Fact.findByIdAndDelete(id);
    if (!deletedFact) {
      return NextResponse.json({ message: "Fact not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Fact deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error in DELETE /api/v1/fact/[id]:`, error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}