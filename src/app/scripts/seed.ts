// src/scripts/seed.ts
import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';
import { books as staticBooks } from '../../app/data/books';
import { reviews as staticReviews } from '../../app/data/reviews';

/**
 * Comprehensive seeding script for both books and reviews
 * ✅ FIXED: Now properly maps book IDs to MongoDB ObjectIds for reviews
 */
async function seedDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('🚫 ERROR: MONGODB_URI not found in environment variables.');
    console.error('   Make sure you have a .env.local file with MONGODB_URI defined.');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    console.log('🔗 Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas.\n');

    const dbName = new URL(uri).pathname.substring(1) || 'bookstore';
    const db = client.db(dbName);

    // ============================================
    // SEED BOOKS COLLECTION
    // ============================================
    console.log('📚 Seeding Books Collection...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const booksCollection = db.collection('books');
    
    // Clear existing books
    const deletedBooks = await booksCollection.deleteMany({});
    console.log(`   🧹 Cleared ${deletedBooks.deletedCount} existing books`);
    
    // Prepare books data (remove 'id' field, MongoDB will generate _id)
    const booksToInsert = staticBooks.map(({ id, ...rest }) => rest);
    
    // ✅ KEY FIX: Store the mapping of old IDs to new ObjectIds
    const bookIdMapping: Map<string | number, ObjectId> = new Map();
    
    if (booksToInsert.length === 0) {
      console.log('   ⚠️  No books found to seed');
    } else {
      const booksResult = await booksCollection.insertMany(booksToInsert);
      console.log(`   ✅ Inserted ${booksResult.insertedCount} books`);
      
      // ✅ Create mapping: old static id -> new MongoDB _id
      let index = 0;
      for (const [insertedId, book] of Object.entries(booksResult.insertedIds)) {
        const oldId = staticBooks[index].id;
        bookIdMapping.set(oldId, book as ObjectId);
        console.log(`   📌 Mapped: "${oldId}" -> ${book.toString()}`);
        index++;
      }
    }

    // ============================================
    // SEED REVIEWS COLLECTION
    // ============================================
    console.log('\n💬 Seeding Reviews Collection...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const reviewsCollection = db.collection('reviews');
    
    // Clear existing reviews
    const deletedReviews = await reviewsCollection.deleteMany({});
    console.log(`   🧹 Cleared ${deletedReviews.deletedCount} existing reviews`);
    
    // ✅ KEY FIX: Transform reviews to use new MongoDB ObjectIds
    const reviewsToInsert = staticReviews.map(({ id, bookId, ...rest }) => {
      const newBookId = bookIdMapping.get(bookId);
      
      if (!newBookId) {
        console.warn(`   ⚠️  Warning: No mapping found for bookId "${bookId}". Skipping review.`);
        return null;
      }
      
      return {
        ...rest,
        bookId: newBookId, // ✅ Use the new MongoDB ObjectId
      };
    }).filter(review => review !== null); // Remove null entries
    
    if (reviewsToInsert.length === 0) {
      console.log('   ⚠️  No reviews found to seed');
    } else {
      const reviewsResult = await reviewsCollection.insertMany(reviewsToInsert);
      console.log(`   ✅ Inserted ${reviewsResult.insertedCount} reviews`);
      
      // Show which reviews were mapped to which books
      console.log('\n   📊 Review Distribution:');
      const reviewCounts: Map<string, number> = new Map();
      
      for (const review of reviewsToInsert) {
        const bookIdStr = (review.bookId as ObjectId).toString();
        reviewCounts.set(bookIdStr, (reviewCounts.get(bookIdStr) || 0) + 1);
      }
      
      for (const [bookId, count] of reviewCounts) {
        console.log(`      • Book ${bookId}: ${count} review(s)`);
      }
    }

    // ============================================
    // CREATE INDEXES
    // ============================================
    console.log('\n🔍 Creating Indexes...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    try {
      // Index on book title and author for faster searches
      await booksCollection.createIndex({ title: 'text', author: 'text' });
      console.log('   ✅ Created text index on books (title, author)');
      
      // ✅ CRITICAL: Index on reviews by bookId (as ObjectId)
      await reviewsCollection.createIndex({ bookId: 1 });
      console.log('   ✅ Created index on reviews (bookId)');
    } catch (indexError) {
      console.log('   ⚠️  Indexes may already exist (this is okay)');
    }

    // ============================================
    // SUMMARY
    // ============================================
    console.log('\n🎉 Database Seeding Complete!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   📊 Database: ${dbName}`);
    console.log(`   📚 Books: ${booksToInsert.length} documents`);
    console.log(`   💬 Reviews: ${reviewsToInsert.length} documents`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('💡 Next Steps:');
    console.log('   1. Verify data in MongoDB Atlas dashboard');
    console.log('   2. Run your Next.js app: npm run dev');
    console.log('   3. Check book detail pages for reviews\n');

  } catch (error) {
    console.error('\n❌ Seeding Error:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔌 MongoDB connection closed.');
  }
}

// Execute the seeding
seedDatabase();