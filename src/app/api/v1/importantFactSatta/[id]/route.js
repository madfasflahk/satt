
import dbConnect from '../../../../../lib/db';
import ImportantFactAboutSatta from '../../../../../models/ImportantFactAboutSatta';
import { NextResponse } from 'next/server';
export async function PUT(request) {
  await dbConnect();
  
  try {
    // Extract id from URL
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    
    console.log("Extracted ID from URL:", id);
    
    if (!id || id.trim() === '') {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }
    
    const body = await request.json();
    
    // You can also try finding and updating separately
    const existingFact = await ImportantFactAboutSatta.findById(id);
    
    if (!existingFact) {
      console.log(`Document not found for ID: ${id}`);
      return NextResponse.json({ 
        message: 'Important Fact not found',
        providedId: id 
      }, { status: 404 });
    }
    
    // Update the document
    Object.assign(existingFact, body);
    await existingFact.save();
    
    console.log("Document updated successfully");
    return NextResponse.json(existingFact, { status: 200 });
    
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ 
      message: 'Error updating important fact',
      error: error.message 
    }, { status: 500 });
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
