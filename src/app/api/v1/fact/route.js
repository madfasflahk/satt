import dbConnect from '../../../../lib/db';
import Fact from '../../../../models/sattaFact';
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const admin = searchParams.get("admin");

    let facts;
    if (admin) {
      facts = await Fact.find();
    } else {
      facts = await Fact.find({ validation: true });
    }
    
    return NextResponse.json(facts, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/v1/fact:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newFact = new Fact(body);
    await newFact.save();
    return NextResponse.json(newFact, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/v1/fact:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}