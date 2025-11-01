import { NextResponse } from 'next/server';
import { getAllBooks, createBook } from '../../lib/books';
import { Book } from '../../types';


// GET /api/books → Fetch all books
export async function GET() {
  try {
    const books = await getAllBooks();
    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

// POST /api/books → Add a new book
export async function POST(request: Request) {
  try {
    const newBookData: Omit<Book, 'id'> = await request.json();

    if (!newBookData.title || !newBookData.author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newBook = await createBook(newBookData);
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}
