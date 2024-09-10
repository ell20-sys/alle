import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/alle";
console.log(MONGO_URI)

export async function connectToDB(): Promise<void> {
  if (mongoose.connection.readyState >= 1) return; 
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");
}
