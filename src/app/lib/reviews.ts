import { ObjectId } from 'mongodb';
import { connectToDatabase } from './mongodb';
import { Review } from '@/app/types';

const COLLECTION_NAME = 'reviews';

// ✅ Helper: map MongoDB document to Review type
const mapToReview = (doc: any): Review => ({
  id: doc._id.toHexString(),
  bookId: doc.bookId instanceof ObjectId ? doc.bookId.toHexString() : doc.bookId,
  author: doc.author,
  rating: doc.rating,
  title: doc.title,
  comment: doc.comment,
  timestamp: doc.timestamp,
  verified: doc.verified ?? false,
});

/**
 * ✅ Get all reviews for a book
 */
export async function getReviewsByBookId(bookId: string): Promise<Review[]> {
  const { db } = await connectToDatabase();
  const collection = db.collection(COLLECTION_NAME);

  try {
    const bookObjectId = new ObjectId(bookId);
    const docs = await collection.find({ bookId: bookObjectId }).toArray();
    return docs.map(mapToReview);
  } catch (error) {
    console.error(`Error fetching reviews for book ${bookId}:`, error);
    return [];
  }
}

/**
 * ✅ Get a single review by ID
 */
export async function getReviewById(id: string): Promise<Review | null> {
  const { db } = await connectToDatabase();
  const collection = db.collection(COLLECTION_NAME);

  try {
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    return doc ? mapToReview(doc) : null;
  } catch (error) {
    console.error(`Error fetching review ${id}:`, error);
    return null;
  }
}

/**
 * 🟢 Add a new review for a book
 */
export async function addReview(bookId: string, data: Omit<Review, 'id' | 'bookId'>): Promise<Review | null> {
  const { db } = await connectToDatabase();
  const collection = db.collection(COLLECTION_NAME);

  try {
    const newReview = {
      ...data,
      bookId: new ObjectId(bookId),
      timestamp: data.timestamp ?? new Date().toISOString(),
      verified: data.verified ?? false,
    };

    const result = await collection.insertOne(newReview);
    const inserted = await collection.findOne({ _id: result.insertedId });
    return inserted ? mapToReview(inserted) : null;
  } catch (error) {
    console.error('Error adding review:', error);
    return null;
  }
}
