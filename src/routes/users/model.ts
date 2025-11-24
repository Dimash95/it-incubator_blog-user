import mongoose from "mongoose";
import { UserType } from "./types";

const UserSchema = new mongoose.Schema(
  {
    login: { type: String, required: true, maxlength: 50 },
    password: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, maxlength: 50 },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  {
    versionKey: false,
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
  }
);

export const UserModel = mongoose.model<UserType>("User", UserSchema);
