'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Book } from '../types';
import BookCard from './BookCard';
import BookListItem from './BookListItem';
import Pagination from './Pagination';

interface BookGridProps {
  onAddToCart?: (bookId: string) => void;
}

const BookGrid: React.FC<BookGridProps> = ({ onAddToCart }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [featuredCarouselIndex, setFeaturedCarouselIndex] = useState(0);

  // --- Fetch books from API ---
  useEffect(() => {
   const fetchBooks = async () => {
  setLoading(true);
  try {
    const response = await fetch('/api/books');
    if (!response.ok) throw new Error('Failed to fetch books');
    const data: Book[] = await response.json();
    setBooks(data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      setError(err.message);
    } else {
      console.error('Unknown error:', err);
      setError('Something went wrong');
    }
  } finally {
    setLoading(false);
  }
};


    fetchBooks();
  }, []);

  const featuredBooks = useMemo(() => books.filter(book => book.featured), [books]);

  // Carousel settings for featured books
  const booksPerPage = 4;
  const totalFeaturedPages = Math.ceil(featuredBooks.length / booksPerPage);

  const currentFeaturedBooks = useMemo(() => {
    const startIndex = featuredCarouselIndex * booksPerPage;
    return featuredBooks.slice(startIndex, startIndex + booksPerPage);
  }, [featuredBooks, featuredCarouselIndex]);

  const goToPreviousFeatured = () => setFeaturedCarouselIndex(prev => prev === 0 ? totalFeaturedPages - 1 : prev - 1);
  const goToNextFeatured = () => setFeaturedCarouselIndex(prev => prev === totalFeaturedPages - 1 ? 0 : prev + 1);
  const goToFeaturedPage = (pageIndex: number) => setFeaturedCarouselIndex(pageIndex);

  const genres = useMemo(() => {
    const allGenres = books.flatMap(book => book.genre);
    return ['All', ...new Set(allGenres)];
  }, [books]);

  const filteredAndSortedBooks = useMemo(() => {
    const filtered = books.filter(book => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || book.genre.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    });

    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'title': comparison = a.title.localeCompare(b.title); break;
        case 'author': comparison = a.author.localeCompare(b.author); break;
        case 'datePublished': comparison = new Date(a.datePublished).getTime() - new Date(b.datePublished).getTime(); break;
        case 'rating': comparison = a.rating - b.rating; break;
        case 'reviewCount': comparison = a.reviewCount - b.reviewCount; break;
        case 'price': comparison = a.price - b.price; break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [books, searchQuery, selectedGenre, sortBy, sortOrder]);

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedBooks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedBooks, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedBooks.length / itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedGenre, sortBy, sortOrder, itemsPerPage]);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  if (loading) return <p className="text-center text-gray-500">Loading books...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Books Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Featured Books</h2>
          {totalFeaturedPages > 1 && (
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {Array.from({ length: totalFeaturedPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToFeaturedPage(index)}
                    className={`w-2 h-2 rounded-full ${index === featuredCarouselIndex ? 'bg-indigo-600' : 'bg-gray-300'}`}
                    aria-label={`Go to featured books page ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={goToPreviousFeatured} className="p-2 rounded-full border bg-white">Prev</button>
                <button onClick={goToNextFeatured} className="p-2 rounded-full border bg-white">Next</button>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentFeaturedBooks.map(book => (
            <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* Search, Filter, Sort */}
      <section className="mb-8">
        {/* Search & Genre Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:w-1/2"
          />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:w-1/4"
          >
            {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
          </select>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="datePublished">Release Date</option>
            <option value="rating">Rating</option>
            <option value="reviewCount">Review Count</option>
            <option value="price">Price</option>
          </select>
          <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
            {sortOrder === 'asc' ? 'Asc' : 'Desc'}
          </button>
        </div>
      </section>

      {/* All Books List */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">All Books</h2>
        {filteredAndSortedBooks.length === 0 ? (
          <p className="text-center text-gray-500">No books found.</p>
        ) : (
          <>
            <div className="space-y-3">
              {paginatedBooks.map(book => (
                <BookListItem key={book.id} book={book} onAddToCart={onAddToCart} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={filteredAndSortedBooks.length}
            />
          </>
        )}
      </section>
    </div>
  );
};

export default BookGrid;
