import mongoose, { model, Model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, UserMethods } from "../types/user.interface";

type UserModel = Model<IUser, {}, UserMethods>;

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hash: { type: String },
});

const ITERATIONS = 10;

UserSchema.methods.setPassword = async function (password: string) {
  const result = await bcrypt.hash(password, ITERATIONS);
  this.hash = result;
};

UserSchema.methods.validatePassword = async function (password: string) {
  const result = bcrypt.compare(password, this.hash);
  return result;
};

export const User = model<IUser, UserModel>("User", UserSchema);
