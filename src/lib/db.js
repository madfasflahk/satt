import mongoose from 'mongoose';

const MONGODB_URI = process.env.DATA;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the DATA environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot-reloads
 * in development. This prevents connections growing exponentially during API calls.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB Connected Successfully!");
      return mongoose;
    }).catch((error) => {
      console.error("MongoDB Connection Error:", error);
      throw error;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
