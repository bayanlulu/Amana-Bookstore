// src/app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { Book } from './types';
import BookGrid from './components/BookGrid';

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
    // Simulate initial load check if needed
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading books...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  // function handleAddToCart(bookId: string): void {
  //   throw new Error('Function not implemented.');
  // }

   return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <section className="text-center bg-indigo-500 hover:bg-indigo-600 p-8 rounded-lg mb-12 shadow-md">
        <h1 className="text-5xl font-extrabold text-indigo-100 mb-2">Welcome to the Amana Bookstore!</h1>
        <p className="text-lg text-indigo-100">
          Your one-stop shop for the best books. Discover new worlds and adventures.
        </p>
      </section>

      {/* Book Grid */}
        <BookGrid  />
    </div>
  );
}
