import { ObjectId } from "mongodb";

type SuccessResponse = {
  message: string;
  _id?: ObjectId;
};

export default SuccessResponse;
