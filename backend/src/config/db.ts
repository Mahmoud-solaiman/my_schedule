import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Database connected successfully');
  } catch (error: any) {
    console.error('Database connection error', error.message)
    process.exit(1);
  }
}