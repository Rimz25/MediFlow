import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    // Do NOT process.exit() in serverless — it kills the whole function invocation.
    // Just log it; the error will naturally surface when a DB query fails.
  }
};

export default connectDB;
