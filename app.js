// Imports
import express from "express";
import cors from "cors";
import contacts from "./data.js";

// ========== Setup ========== //

// Create Express app
const app = express();
const PORT = 3000;

// Configure middleware
app.use(express.json()); // to parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// ========== Routes ========== //

// Root route
app.get("/", (req, res) => {
    res.send("Node.js REST API with Express.js");
});

// Get all contacts (GET /contacts)
app.get("/contacts", (req, res) => {
    res.json(contacts); // return contacts list as JSON
});

// Search contacts (GET /contacts/search?q=)
app.get("/contacts/search", (req, res) => {
    const searchString = req.query.q.toLowerCase(); // get query string from request URL and lowercase it
    const filteredContacts = contacts.filter(
        // filter contacts array
        contact =>
            contact.first.toLowerCase().includes(searchString) || contact.last.toLowerCase().includes(searchString)
    );
    res.json(filteredContacts); // return filtered contacts list as JSON
});

// Get single contact (GET /contacts/:id)
app.get("/contacts/:id", (req, res) => {
    const id = Number(req.params.id); // get id from request URL
    const contact = contacts.find(contact => contact.id === id); // find the contact in contacts array

    if (contact) {
        res.json(contact); // return contact as JSON if found
    } else {
        res.status(404).json({ message: "Contact not found!" }); // otherwise return 404 and error message
    }
});

// Create contact (POST /contacts)
app.post("/contacts", (req, res) => {
    const id = new Date().getTime(); // not really unique, but it's something
    const createdAt = new Date().toISOString(); // ISO string
    const newContact = { id, createdAt, ...req.body }; // merge data from request body into new contact object
    contacts.push(newContact); // push new contact object into contacts array
    res.json(newContact); // return new contact object as JSON
});

// Update contact (PUT /contacts/:id)
app.put("/contacts/:id", (req, res) => {
    const id = Number(req.params.id); // get id from request URL
    const updatedContact = req.body; // get updated properties from request body
    const contact = contacts.find(contact => contact.id === id); // find the contact in contacts array

    // update contact properties with new values
    contact.first = updatedContact.first;
    contact.last = updatedContact.last;
    contact.twitter = updatedContact.twitter;
    contact.avatar = updatedContact.avatar;

    res.json(contact); // return updated contact
});

// Delete contact (DELETE /contacts/:id)
app.delete("/contacts/:id", (req, res) => {
    const id = Number(req.params.id); // get id from request URL
    const index = contacts.findIndex(contact => contact.id === id); // find index of contact in contacts array
    contacts.splice(index, 1); // remove contact from contacts array
    res.json({ message: `Deleted contact with id ${id}` }); // return message
});

// Toggle favorite property of contact (PUT /contacts/:id/favorite)
app.put("/contacts/:id/favorite", (req, res) => {
    const id = Number(req.params.id); // get id from request URL
    const contact = contacts.find(contact => contact.id === id); // find the contact in contacts array
    contact.favorite = !contact.favorite; // toggle favorite property
    res.json(contact); // return updated contact
});

// ========== Start server ========== //

// Start server on port 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
