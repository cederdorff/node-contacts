import { Request, Response } from "express";
import {
  getAllContacts,
  searchContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  toggleFavorite
} from "../models/contactsModel.js";
import Contact from "../types/contact.js";
import ErrorResponse from "../types/errorResponse.js";
import SuccessResponse from "../types/successResponse.js";

export async function fetchAllContacts(req: Request, res: Response<Contact[]>) {
  const contacts: Contact[] = await getAllContacts();
  res.json(contacts);
}

export async function searchForContacts(req: Request, res: Response<Contact[]>) {
  const searchString = (req.query.q as string)?.toLowerCase();
  const results: Contact[] = await searchContacts(searchString);
  res.json(results);
}

export async function fetchContactById(req: Request, res: Response<Contact | ErrorResponse>) {
  const contact: Contact | null = await getContactById(req.params.id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Contact not found!" });
  }
}

export async function addNewContact(req: Request, res: Response<SuccessResponse | ErrorResponse>) {
  const result = await createContact(req.body);
  if (result.acknowledged) {
    res.json({ message: "Created new contact", _id: result.insertedId });
  } else {
    res.status(500).json({ message: "Failed to create contact" });
  }
}

export async function modifyContact(req: Request, res: Response<SuccessResponse | ErrorResponse>) {
  const result = await updateContact(req.params.id, req.body);
  if (result.modifiedCount > 0) {
    res.json({ message: `Updated contact with id ${req.params.id}` });
  } else {
    res.status(500).json({ message: "Failed to update contact" });
  }
}

export async function removeContact(req: Request, res: Response<SuccessResponse | ErrorResponse>) {
  const result = await deleteContact(req.params.id);
  if (result.deletedCount > 0) {
    res.json({ message: `Deleted contact with id ${req.params.id}` });
  } else {
    res.status(500).json({ message: "Failed to delete contact" });
  }
}

export async function toggleContactFavorite(req: Request, res: Response<SuccessResponse | ErrorResponse>) {
  const result = await toggleFavorite(req.params.id);
  console.log(result);

  if (result) {
    res.json({ message: `Toggled favorite for contact with id ${req.params.id}` });
  } else {
    res.status(404).json({ message: "Contact not found!" });
  }
}
