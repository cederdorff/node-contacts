import db from "../config/database.js";
import { Collection, ObjectId } from "mongodb";
import Contact from "../types/contact.js";

const collection: Collection<Contact> = db.collection("contacts");

export function getAllContacts(): Promise<Contact[]> {
  return collection.find().sort({ first: 1, last: 1 }).toArray();
}

export function searchContacts(query: string): Promise<Contact[]> {
  return collection
    .find({ $or: [{ first: { $regex: query, $options: "i" } }, { last: { $regex: query, $options: "i" } }] })
    .sort({ first: 1, last: 1 })
    .toArray();
}

export function getContactById(id: string): Promise<Contact | null> {
  return collection.findOne({ _id: new ObjectId(id) });
}

export function createContact(newContact: Contact): Promise<{ insertedId: ObjectId; acknowledged: boolean }> {
  return collection.insertOne(newContact);
}

export function updateContact(id: string, updatedData: Partial<Contact>): Promise<{ modifiedCount: number }> {
  return collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
}

export function deleteContact(id: string): Promise<{ deletedCount: number }> {
  return collection.deleteOne({ _id: new ObjectId(id) });
}

export async function toggleFavorite(id: string): Promise<any> {
  const contact = await getContactById(id);
  if (!contact) return null;
  return collection.updateOne({ _id: new ObjectId(id) }, { $set: { favorite: !contact.favorite } });
}
