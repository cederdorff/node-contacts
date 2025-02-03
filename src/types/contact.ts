import { ObjectId } from "mongodb";

type Contact = {
  _id: ObjectId;
  first: string;
  last: string;
  twitter: string;
  email: string;
  avatar?: string;
  favorite?: boolean;
};

export default Contact;
