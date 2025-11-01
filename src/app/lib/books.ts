// src/lib/books.ts
import { ObjectId, Collection } from 'mongodb';
import { connectToDatabase } from './mongodb';
// Assuming your existing Book type from src/app/types/index.ts
import { Book } from '../../app/types';

// Extend the Book type to include the MongoDB ObjectId for the primary key
export interface MongoBook extends Omit<Book, 'id'> {
  _id: ObjectId;
}

// Utility to get the books collection
async function getBooksCollection(): Promise<Collection<MongoBook>> {
  const { db } = await connectToDatabase();
  // 'books' is the name of your collection
  return db.collection<MongoBook>('books');
}

// --- CRUD Operations ---

/**
 * READ: Fetches all books from the collection.
 * @returns A promise that resolves to an array of books (with string ID).
 */
export async function getAllBooks(): Promise<Book[]> {
  const collection = await getBooksCollection();
  
  // Find all documents, convert them to an array, and map _id to id
  const mongoBooks = await collection.find({}).toArray();
  
  return mongoBooks.map(book => ({
    ...book,
    id: book._id.toHexString(), // Convert MongoDB's ObjectId to a string 'id'
    _id: undefined, // Remove the _id property from the exposed interface
  })) as Book[];
}

/**
 * READ: Fetches a single book by its string ID.
 * @param id The string ID of the book.
 * @returns A promise that resolves to the found book or null.
 */
export async function getBookById(id: string): Promise<Book | null> {
  const collection = await getBooksCollection();

  try {
    const mongoBook = await collection.findOne({ _id: new ObjectId(id) });

    if (!mongoBook) {
      return null;
    }

    return {
      ...mongoBook,
      id: mongoBook._id.toHexString(),
      _id: undefined,
    } as Book;
  } catch (error) {
    // Handle case where id is not a valid 24-character hex string (invalid ObjectId)
    console.error(`Invalid ObjectId: ${id}`, error);
    return null;
  }
}

/**
 * CREATE: Adds a new book to the collection.
 * @param newBookData The data for the new book (excluding the 'id' field).
 * @returns A promise that resolves to the newly created book (with string ID).
 */
export async function createBook(newBookData: Omit<Book, 'id'>): Promise<Book> {
  const collection = await getBooksCollection();
  
  // Cast the data to MongoBook structure (it will automatically add _id on insert)
  const result = await collection.insertOne(newBookData as MongoBook);

  if (!result.insertedId) {
    throw new Error('Failed to insert new book.');
  }

  // Return the newly created document data with the string id
  return {
    ...newBookData,
    id: result.insertedId.toHexString(),
  };
}

/**
 * UPDATE: Modifies an existing book.
 * @param id The string ID of the book to update.
 * @param updates The fields to update.
 * @returns A promise that resolves to a boolean indicating success.
 */
export async function updateBook(id: string, updates: Partial<Omit<Book, 'id'>>): Promise<boolean> {
  const collection = await getBooksCollection();

  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    
    // Check if a document was found and modified
    return result.matchedCount > 0 && result.modifiedCount > 0;
  } catch (error) {
    console.error(`Error updating book ${id}:`, error);
    return false;
  }
}

/**
 * DELETE: Removes a book from the collection.
 * @param id The string ID of the book to delete.
 * @returns A promise that resolves to a boolean indicating success.
 */
export async function deleteBook(id: string): Promise<boolean> {
  const collection = await getBooksCollection();

  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    // Check if a document was successfully deleted
    return result.deletedCount === 0 ? false : true;
  } catch (error) {
    console.error(`Error deleting book ${id}:`, error);
    return false;
  }
}