import { MongoClient, Db } from "mongodb";

const mongoUri = process.env.MONGODB_URI || "";
const databaseName = process.env.MONGODB_DATABASE || "";

if (!mongoUri) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}
if (!databaseName) {
  throw new Error("MONGODB_DATABASE is not defined in environment variables.");
}

const client = new MongoClient(mongoUri);

let dbInstance: Db | null = null;

async function getDatabase(): Promise<Db> {
  if (dbInstance) {
    return dbInstance; // Return existing instance if already connected
  }

  try {
    await client.connect();
    dbInstance = client.db(databaseName);
    console.log(`Connected to database: ${databaseName}`);
    return dbInstance;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}

// Automatically close the database connection when the Node.js process exits
process.on("exit", async () => {
  if (client) {
    await client.close();
    console.log("Database connection closed due to process exit.");
  }
});

// Handle CTRL+C events (SIGINT)
process.on("SIGINT", async () => {
  if (client) {
    await client.close();
    console.log("Database connection closed due to SIGINT.");
  }
  process.exit();
});

const db = await getDatabase();

export default db;
