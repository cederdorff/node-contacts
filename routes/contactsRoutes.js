import express from "express";
import {
  fetchAllContacts,
  searchForContacts,
  fetchContactById,
  addNewContact,
  modifyContact,
  removeContact,
  toggleContactFavorite
} from "../controllers/contactsController.js";

const contactsRouter = express.Router();

contactsRouter.get("/", fetchAllContacts);
contactsRouter.get("/search", searchForContacts);
contactsRouter.get("/:id", fetchContactById);
contactsRouter.post("/", addNewContact);
contactsRouter.put("/:id", modifyContact);
contactsRouter.delete("/:id", removeContact);
contactsRouter.patch("/:id/favorite", toggleContactFavorite);

export default contactsRouter;
