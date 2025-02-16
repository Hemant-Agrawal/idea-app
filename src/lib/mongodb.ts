import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_PUBLIC_MONGO_URL || '';
let client: MongoClient | null = null;

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db('ideaSharing');
} 