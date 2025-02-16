import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

// Define interfaces for type safety
interface IdeaInput {
  title: string;
  description: string;
  linkedinUrl: string;
}

interface Idea extends IdeaInput {
  createdAt: Date;
}

export async function POST(request: Request) {
  try {
    const { title, description, linkedinUrl }: IdeaInput = await request.json();
    const db = await connectToDatabase();
    const collection = db.collection('ideas');
    
    await collection.insertOne({ title, description, linkedinUrl, createdAt: new Date() });
    return NextResponse.json({ message: 'Idea added successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('ideas');
    
    const documents = await collection.find().sort({ createdAt: -1 }).toArray();
    const ideas: Idea[] = documents.map(doc => ({
      _id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      linkedinUrl: doc.linkedinUrl,
      createdAt: doc.createdAt,
      likes: doc.likes || 0,
      comments: doc.comments || []
    }));

    return NextResponse.json(ideas);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 