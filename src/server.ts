// ========== Imports ========== //
import express, { Request, Response } from "express";
import cors from "cors";
import db from "./database.js";
import { ObjectId } from "mongodb";

// ========== Setup ========== //

// Create Express app
const server = express();
const PORT = process.env.PORT || 3000;

// Configure middleware
server.use(express.json()); // Parse JSON bodies
server.use(cors()); // Enable CORS for all routes

// ========== Types ========== //
type Contact = {
  _id?: ObjectId; // Optional during creation
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

type ContactResponse = {
  message: string;
  _id?: ObjectId;
};

type errorResponse = {
  message: string;
};

// ========== Routes ========== //

// Root route
server.get("/", (req: Request, res: Response) => {
  res.send("Node.js REST API with Express.js");
});

// Get all contacts (GET /contacts)
server.get("/contacts", async (req: Request, res: Response<Contact[] | errorResponse>) => {
  try {
    const contacts = await db.collection<Contact>("contacts").find().sort({ first: 1, last: 1 }).toArray();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

// Search contacts (GET /contacts/search?q=)
server.get("/contacts/search", async (req: Request, res: Response<Contact[] | errorResponse>) => {
  const searchString = (req.query.q as string)?.toLowerCase() || "";
  const query = {
    $or: [{ first: { $regex: searchString, $options: "i" } }, { last: { $regex: searchString, $options: "i" } }]
  };

  try {
    const results = await db.collection<Contact>("contacts").find(query).sort({ first: 1, last: 1 }).toArray();
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Error searching contacts" });
  }
});

// Get single contact (GET /contacts/:id)
server.get("/contacts/:id", async (req: Request<{ id: string }>, res: Response<Contact | errorResponse>) => {
  const id = req.params.id;
  try {
    const contact = await db.collection<Contact>("contacts").findOne({ _id: new ObjectId(id) });
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Contact not found!" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

// Create contact (POST /contacts)
server.post("/contacts", async (req: Request<{}, {}, Contact>, res: Response<ContactResponse>) => {
  const newContact = req.body;
  try {
    const result = await db.collection<Contact>("contacts").insertOne(newContact);
    res.json({ message: "Created new contact", _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Failed to create new contact" });
  }
});

// Update contact (PUT /contacts/:id)
server.put("/contacts/:id", async (req: Request<{ id: string }, {}, Contact>, res: Response<ContactResponse>) => {
  const id = req.params.id;
  const updatedContact = req.body;
  try {
    const result = await db
      .collection<Contact>("contacts")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedContact });

    if (result.matchedCount > 0) {
      res.json({ message: `Updated contact with id ${id}` });
    } else {
      res.status(404).json({ message: "Contact not found!" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

// Delete contact (DELETE /contacts/:id)
server.delete("/contacts/:id", async (req: Request<{ id: string }>, res: Response<ContactResponse>) => {
  const id = req.params.id;
  try {
    const result = await db.collection<Contact>("contacts").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount > 0) {
      res.json({ message: `Deleted contact with id ${id}` });
    } else {
      res.status(404).json({ message: "Contact not found!" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

// Toggle favorite property of contact (PATCH /contacts/:id/favorite)
server.patch("/contacts/:id/favorite", async (req: Request<{ id: string }>, res: Response<ContactResponse>) => {
  const id = req.params.id;
  try {
    const contact = await db.collection<Contact>("contacts").findOne({ _id: new ObjectId(id) });

    if (contact) {
      const newFavoriteValue = !contact.favorite;
      await db
        .collection<Contact>("contacts")
        .updateOne({ _id: new ObjectId(id) }, { $set: { favorite: newFavoriteValue } });

      res.json({ message: `Toggled favorite property of contact with id ${id}` });
    } else {
      res.status(404).json({ message: "Contact not found!" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

// ========== Start server ========== //

// Start server on port (3000)
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
