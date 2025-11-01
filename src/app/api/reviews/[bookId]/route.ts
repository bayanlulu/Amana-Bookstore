// src/app/api/reviews/[bookId]/route.ts
import { NextResponse } from 'next/server';
import { getReviewsByBookId, addReview } from '@/app/lib/reviews';

// GET /api/reviews/[bookId] - Fetch reviews for a book
export async function GET(request: Request, context: { params: Promise<{ bookId: string }> }) {
  try {
    const { bookId } = await context.params;
    const reviews = await getReviewsByBookId(bookId);
    return NextResponse.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// POST /api/reviews/[bookId] - Add new review
export async function POST(request: Request, context: { params: Promise<{ bookId: string }> }) {
  try {
    const { bookId } = await context.params;
    const body = await request.json();
    const newReview = await addReview(bookId, body);
    return NextResponse.json(newReview, { status: 201 });
  } catch (err) {
    console.error('Error adding review:', err);
    return NextResponse.json({ error: 'Failed to add review' }, { status: 500 });
  }
}


