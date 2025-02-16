import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const db = await connectToDatabase();
    const collection = db.collection('ideas');

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $inc: { likes: 1 } },
    );

    if (!result?._id) {
      return NextResponse.json({ message: 'Idea not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Idea liked', idea: result.value });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const db = await connectToDatabase();
    const collection = db.collection('ideas');

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $inc: { likes: -1 } },
    );

    if (!result?._id) {
      return NextResponse.json({ message: 'Idea not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Like removed', idea: result.value });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 