// src/lib/mongodb.ts
import { MongoClient, Db } from 'mongodb';

// Check for the MongoDB URI environment variable
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Global variable to store the connection client and database
// This is used to maintain a single connection across hot-reloads in development
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

/**
 * Connects to the MongoDB database using the MONGODB_URI.
 * The connection client and database object are cached to prevent multiple
 * connections in a Next.js development environment.
 * @returns An object containing the MongoClient and the Db instance.
 */
export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  // If a cached connection exists, return it immediately
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Set up the client connection options
  const client = new MongoClient(uri!);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    
    // Determine the database name from the URI or set a default
    // e.g., 'myDatabaseName' is often part of the Atlas connection string
    const dbName = new URL(uri!).pathname.substring(1) || 'bookstore'; 
    const db = client.db(dbName);

    // Cache the connection for future use (only for non-production environments)
    if (process.env.NODE_ENV === 'development') {
      cachedClient = client;
      cachedDb = db;
    }

    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas:', error);
    // Ensure the client is closed if the connection fails
    await client.close();
    throw new Error('Database connection failed');
  }
}