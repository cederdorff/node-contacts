import {
  getAllContacts,
  searchContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  toggleFavorite
} from "../models/contactsModel.js";

export async function fetchAllContacts(req, res) {
  const contacts = await getAllContacts();
  res.json(contacts);
}

export async function searchForContacts(req, res) {
  const searchString = req.query.q.toLowerCase();
  const results = await searchContacts(searchString);
  res.json(results);
}

export async function fetchContactById(req, res) {
  const contact = await getContactById(req.params.id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Contact not found!" });
  }
}

export async function addNewContact(req, res) {
  const result = await createContact(req.body);
  if (result.acknowledged) {
    res.json({ message: "Created new contact", _id: result.insertedId });
  } else {
    res.status(500).json({ message: "Failed to create contact" });
  }
}

export async function modifyContact(req, res) {
  const result = await updateContact(req.params.id, req.body);
  if (result.modifiedCount > 0) {
    res.json({ message: `Updated contact with id ${req.params.id}` });
  } else {
    res.status(500).json({ message: "Failed to update contact" });
  }
}

export async function removeContact(req, res) {
  const result = await deleteContact(req.params.id);
  if (result.deletedCount > 0) {
    res.json({ message: `Deleted contact with id ${req.params.id}` });
  } else {
    res.status(500).json({ message: "Failed to delete contact" });
  }
}

export async function toggleContactFavorite(req, res) {
  const result = await toggleFavorite(req.params.id);
  if (result) {
    res.json({ message: `Toggled favorite for contact with id ${req.params.id}` });
  } else {
    res.status(404).json({ message: "Contact not found!" });
  }
}
