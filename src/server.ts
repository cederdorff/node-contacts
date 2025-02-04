// ========== Imports ========== //
import cors from "cors";
import express, { Request, Response } from "express";
import contactsRouter from "./routes/contactsRoutes.js";

// ========== Setup ========== //

// Create Express app
const server = express();
const PORT = process.env.PORT || 3000;

// Configure middleware
server.use(express.json()); // to parse JSON bodies
server.use(cors()); // Enable CORS for all routes
server.use("/contacts", contactsRouter); // Mount contacts router

// ========== Routes ========== //

// Root route
server.get("/", async (req: Request, res: Response<string>) => {
  res.send("Node.js REST API with Express.js successfully connected to MongoDB!");
});

// ========== Start server ========== //

// Start server on port (3000)
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
