import db from "../config/database.js";
import { ObjectId } from "mongodb";

const collection = db.collection("contacts");

export function getAllContacts() {
  return collection.find().sort({ first: 1, last: 1 }).toArray();
}

export function searchContacts(query) {
  return collection
    .find({ $or: [{ first: { $regex: query, $options: "i" } }, { last: { $regex: query, $options: "i" } }] })
    .sort({ first: 1, last: 1 })
    .toArray();
}

export function getContactById(id) {
  return collection.findOne({ _id: new ObjectId(id) });
}

export function createContact(newContact) {
  return collection.insertOne(newContact);
}

export function updateContact(id, updatedData) {
  return collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
}

export function deleteContact(id) {
  return collection.deleteOne({ _id: new ObjectId(id) });
}

export async function toggleFavorite(id) {
  const contact = await getContactById(id);
  if (!contact) return null;
  return collection.updateOne({ _id: new ObjectId(id) }, { $set: { favorite: !contact.favorite } });
}
