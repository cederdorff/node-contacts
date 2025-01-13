import mongoose from "mongoose";

// Function to connect to the MongoDB database
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DATABASE // Specify the database name
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

// Automatically close the Mongoose connection when the Node.js process exits
process.on("exit", async () => {
  await mongoose.disconnect();
  console.log("Mongoose connection closed on process exit");
});

// Handle CTRL+C events
process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("Mongoose connection closed on SIGINT");
  process.exit();
});

// Connect to the database
await connectToDatabase();

export default mongoose; // Export Mongoose for use in your models
