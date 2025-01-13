// Imports
import express from "express";
import cors from "cors";
import mongoose from "./database.js";

// ========== Setup ========== //

// Create Express app
const server = express();
const PORT = process.env.PORT || 3000;

// Configure middleware
server.use(express.json()); // to parse JSON bodies
server.use(cors()); // Enable CORS for all routes

// ========== Schema and Model ========== //

const contactSchema = new mongoose.Schema({
  first: String,
  last: String,
  avatar: String,
  twitter: String,
  favorite: { type: Boolean, default: false }
});

const Contact = mongoose.model("Contact", contactSchema);

// ========== Seed Data ========== //
Contact.create({
  first: "Scott",
  last: "Smerchek",
  avatar: "https://sessionize.com/image/907a-400o400o2-9TM2CCmvrw6ttmJiTw4Lz8.jpg",
  twitter: "@smerchek"
});

// ========== Routes ========== //

// Root route
server.get("/", (req, res) => {
  res.send("Node.js REST API with Express.js and Mongoose");
});

// Get all contacts (GET /contacts)
server.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ first: 1, last: 1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts", error });
  }
});

// Search contacts (GET /contacts/search?q=)
server.get("/contacts/search", async (req, res) => {
  const searchString = req.query.q || "";
  try {
    const results = await Contact.find({
      $or: [
        { first: { $regex: searchString, $options: "i" } },
        { last: { $regex: searchString, $options: "i" } }
      ]
    }).sort({ first: 1, last: 1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Failed to search contacts", error });
  }
});

// Get single contact (GET /contacts/:id)
server.get("/contacts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Contact not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact", error });
  }
});

// Create contact (POST /contacts)
server.post("/contacts", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json({ message: "Created new contact", _id: savedContact._id });
  } catch (error) {
    res.status(500).json({ message: "Failed to create new contact", error });
  }
});

// Update contact (PUT /contacts/:id)
server.put("/contacts/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (updatedContact) {
      res.json({ message: `Updated contact with id ${req.params.id}`, updatedContact });
    } else {
      res.status(404).json({ message: "Contact not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update contact", error });
  }
});

// Delete contact (DELETE /contacts/:id)
server.delete("/contacts/:id", async (req, res) => {
  try {
    const result = await Contact.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: `Deleted contact with id ${req.params.id}` });
    } else {
      res.status(404).json({ message: "Contact not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact", error });
  }
});

// Toggle favorite property of contact (PATCH /contacts/:id/favorite)
server.patch("/contacts/:id/favorite", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      contact.favorite = !contact.favorite;
      await contact.save();
      res.json({
        message: `Toggled favorite property of contact with id ${req.params.id}`
      });
    } else {
      res.status(404).json({ message: "Contact not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle favorite", error });
  }
});

// ========== Start server ========== //

// Start server on port 3000
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
