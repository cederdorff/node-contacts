import express from "express";
import cors from "cors";
import contacts from "./data.js";

const app = express();
const PORT = 3000;

app.use(express.json()); // to parse JSON bodies
app.use(cors()); // Enable CORS for all routes

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Node.js REST API with Express.js");
});

app.get("/contacts", (req, res) => {
    res.json(contacts);
});

app.get("/contacts/search", (req, res) => {
    const searchString = req.query.q.toLowerCase();
    const filteredContacts = contacts.filter(
        contact =>
            contact.first.toLowerCase().includes(searchString) || contact.last.toLowerCase().includes(searchString)
    );
    res.json(filteredContacts);
});

app.get("/contacts/:id", (req, res) => {
    const id = Number(req.params.id);
    const contact = contacts.find(contact => contact.id === id);
    console.log(contact);
    if (contact) {
        res.json(contact);
    } else {
        res.status(404).json({ message: "Contact not found!" });
    }
});

app.post("/contacts", (req, res) => {
    const id = new Date().getTime(); // not really unique, but it's something
    const createdAt = new Date().toISOString(); // ISO string
    const newContact = { id, createdAt, ...req.body }; // merge data from request body into new contact object
    contacts.push(newContact); // push new contact object into contacts array
    res.json(newContact); // return new contact object as JSON
});

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

app.delete("/contacts/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = contacts.findIndex(contact => contact.id === id);
    contacts.splice(index, 1);
    res.json({ message: `Deleted contact with id ${id}` });
});

app.put("/contacts/:id/favorite", (req, res) => {
    const id = Number(req.params.id);
    const contact = contacts.find(contact => contact.id === id);
    contact.favorite = !contact.favorite;
    res.json(contact);
});
