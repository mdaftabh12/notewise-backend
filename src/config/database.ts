import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    const connection = await mongoose.connect(mongoUri);

    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ MongoDB Connection Failed:", error.message);
    } else {
      console.error("❌ MongoDB Connection Failed");
    }

    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("📦 MongoDB connection established");
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Error:", err);
});

export default connectDB;
