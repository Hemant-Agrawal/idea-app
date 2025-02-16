import { MongoClient } from 'mongodb';

const uri = 'mongodb://root:j51s5kf7ik0szp2@devinne-fcm6f14nzz.tcp-proxy-2212.dcdeploy.cloud:30878';
let client: MongoClient | null = null;

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db('ideaSharing');
} 