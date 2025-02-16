import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId, PushOperator } from 'mongodb';
import { Idea } from '@/components/IdeaList';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ message: 'Comment text is required' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection('ideas');

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $push: { comments: { text, createdAt: new Date() } } } as unknown as PushOperator<Idea>,
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json({ message: 'Idea not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Comment added', idea: result });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' + `${error}` }, { status: 500 });
  }
} 