// src/app/cart/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Book, CartItem } from '../types';

// Extended cart item with book details
interface CartItemWithBook extends CartItem {
  book?: Book;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemWithBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load cart items and fetch book details
  useEffect(() => {
    loadCart();
    
    // Listen for cart updates from other pages
    const handleCartUpdate = () => {
      loadCart();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      
      // Get cart items from localStorage
      const storedCart = localStorage.getItem('cart');
      const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
      
      if (cart.length === 0) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      // Fetch book details for each cart item
      const itemsWithBooks = await Promise.all(
        cart.map(async (item) => {
          try {
            const response = await fetch(`/api/books/${item.bookId}`);
            if (response.ok) {
              const book = await response.json();
              return { ...item, book };
            }
            return item;
          } catch (err) {
            console.error(`Failed to fetch book ${item.bookId}:`, err);
            return item;
          }
        })
      );

      setCartItems(itemsWithBooks);
    } catch (err) {
      console.error('Error loading cart:', err);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart.map(({ book, ...item }) => item)));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const removeItem = (itemId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart.map(({ book, ...item }) => item)));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    if (item.book) {
      return sum + (item.book.price * item.quantity);
    }
    return sum;
  }, 0);

  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-xl text-gray-600">Loading your cart...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
          <Link href="/" className="inline-block mt-4 text-blue-500 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="text-8xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
           Looks like you haven&apos;t added any books to your cart yet.
        </p>

          <Link 
            href="/"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 font-semibold"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center gap-6 p-6 border-b border-gray-200 last:border-b-0"
              >
                {/* Book Icon */}
                <Link href={`/book/${item.bookId}`} className="flex-shrink-0">
                  <div className="w-24 h-32 bg-gray-200 rounded-md flex items-center justify-center hover:bg-gray-300 transition-colors duration-200">
                    <div className="text-4xl text-gray-400">📚</div>
                  </div>
                </Link>

                {/* Book Details */}
                <div className="flex-1 min-w-0">
                  {item.book ? (
                    <>
                      <Link href={`/book/${item.bookId}`}>
                        <h3 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-200 mb-1">
                          {item.book.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-2">by {item.book.author}</p>
                      <p className="text-lg font-bold text-indigo-700">
                        ${item.book.price.toFixed(2)}
                      </p>
                      {!item.book.inStock && (
                        <p className="text-sm text-red-600 mt-1">Out of Stock</p>
                      )}
                    </>
                  ) : (
                    <div className="text-gray-500">
                      <p>Loading book details...</p>
                      <p className="text-sm text-gray-400">Book ID: {item.bookId}</p>
                    </div>
                  )}
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center font-semibold"
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold text-gray-800 w-12 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center font-semibold"
                    disabled={item.book && !item.book.inStock}
                  >
                    +
                  </button>
                </div>

                {/* Item Total */}
                {item.book && (
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                )}

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2"
                  title="Remove from cart"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Clear Cart Button */}
          <div className="mt-4">
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 transition-colors duration-200 font-medium"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {subtotal < 50 && (
                <p className="text-sm text-gray-500 italic">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}
              <div className="border-t border-gray-300 pt-3 mt-3">
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 font-semibold mb-3">
              Proceed to Checkout
            </button>

            <Link 
              href="/"
              className="block w-full text-center text-indigo-600 hover:text-indigo-700 transition-colors duration-300 font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}