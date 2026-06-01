import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/database";

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // Graceful Shutdown
    process.on("SIGINT", () => {
      console.log("🛑 SIGINT received. Shutting down server...");

      server.close(() => {
        console.log("✅ Server closed successfully");
        process.exit(0);
      });
    });

    process.on("SIGTERM", () => {
      console.log("🛑 SIGTERM received. Shutting down server...");

      server.close(() => {
        console.log("✅ Server closed successfully");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("❌ Failed to start server", error);
    process.exit(1);
  }
};

startServer();