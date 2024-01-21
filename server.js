// Imports
import express from "express";
import cors from "cors";
import db from "./database.js";

// ========== Setup ========== //

// Create Express app
const server = express();
const PORT = process.env.PORT;

// Configure middleware
server.use(express.json()); // to parse JSON bodies
server.use(cors()); // Enable CORS for all routes

// ========== Routes ========== //

// Root route
server.get("/", (req, res) => {
    res.send("Node.js REST API with Express.js");
});

// Get all contacts (GET /contacts)
server.get("/contacts", async (req, res) => {
    const query = "SELECT * FROM contacts"; // SQL query
    const [contacts] = await db.execute(query); // Execute the query

    res.json(contacts); // Send the results as JSON
});

// Search contacts (GET /contacts/search?q=)
server.get("/contacts/search", async (req, res) => {
    const searchString = req.query.q.toLowerCase(); // get query string from request URL and lowercase it
    const query =
        "SELECT * FROM contacts WHERE LOWER(first) LIKE ? OR LOWER(last) LIKE ?"; // SQL query
    const values = [`%${searchString}%`, `%${searchString}%`]; // values to search for
    const [results] = await db.execute(query, values); // Execute the query

    res.json(results); // Send the results as JSON
});

// Get single contact (GET /contacts/:id)
server.get("/contacts/:id", async (req, res) => {
    const id = Number(req.params.id); // get id from request URL and convert it to a number
    const query = "SELECT * FROM contacts WHERE _id = ?"; // SQL query
    const values = [id]; // values to search for (id)
    const [contacts] = await db.execute(query, values); // Execute the query

    if (contacts.length > 0) {
        res.json(contacts[0]); // return first contact from results as JSON
    } else {
        res.status(404).json({ message: "Contact not found!" }); // otherwise return 404 and error message
    }
});

// Create contact (POST /contacts)
server.post("/contacts", async (req, res) => {
    const newContact = req.body; // get new contact object from request body
    const query =
        "INSERT INTO contacts (first, last, twitter, avatar) VALUES (?, ?, ?, ?)"; // SQL query
    const values = [
        newContact.first,
        newContact.last,
        newContact.twitter,
        newContact.avatar
    ]; // values to insert
    const [result] = await db.execute(query, values); // Execute the query

    if (result.affectedRows > 0) {
        res.json({ message: "Created new contact", _id: result.insertId }); // return message and id of new contact
    } else {
        res.status(500).json({ message: "Failed to create new contact" }); // return error message
    }
});

// Update contact (PUT /contacts/:id)
server.put("/contacts/:id", async (req, res) => {
    const id = Number(req.params.id); // get id from request URL
    const updatedContact = req.body; // get updated properties from request body
    const query =
        "UPDATE contacts SET first = ?, last = ?, twitter = ?, avatar = ? WHERE _id = ?"; // SQL query
    const values = [
        updatedContact.first,
        updatedContact.last,
        updatedContact.twitter,
        updatedContact.avatar,
        id
    ]; // values to update
    const [result] = await db.execute(query, values); // Execute the query

    if (result.affectedRows === 0) {
        res.status(404).json({ message: "Contact not found!" }); // return 404 if contact was not found
    } else {
        res.json({ message: `Updated contact with _id ${id}` }); // return result from database
    }
});

// Delete contact (DELETE /contacts/:id)
server.delete("/contacts/:id", async (req, res) => {
    const id = Number(req.params.id); // get id from request URL
    const query = "DELETE FROM contacts WHERE _id = ?"; // SQL query
    const values = [id]; // values to delete
    const [result] = await db.execute(query, values); // Execute the query

    if (result.affectedRows === 0) {
        res.status(404).json({ message: "Contact not found!" }); // return 404 if contact was not found
    } else {
        res.json({ message: `Deleted contact with _id ${id}` }); // return message
    }
});

// Toggle favorite property of contact (PUT /contacts/:id/favorite)
server.put("/contacts/:id/favorite", async (req, res) => {
    const id = Number(req.params.id); // get id from request URL
    const query = "UPDATE contacts SET favorite = !favorite WHERE _id = ?"; // SQL query
    const values = [id]; // values to update
    const [result] = await db.execute(query, values); // Execute the query

    if (result.affectedRows === 0) {
        res.status(404).json({ message: "Contact not found!" }); // return 404 if contact was not found
    } else {
        res.json({ message: `Toggled favorite property of contact with _id ${id}` }); // return message
    }
});

// ========== Start server ========== //

// Start server on port 3000
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
