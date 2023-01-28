import mongoose, { model, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface UserInterface {
  name: { firstName: string; lastName: string };
  username: string;
  email: string;
  hash?: string;
}

interface UserMethods {
  setPassword(password: string): Promise<void>;
  validatePassword(password: string): Promise<boolean>;
}

type UserModel = Model<UserInterface, {}, UserMethods>;

const UserSchema = new mongoose.Schema<UserInterface>({
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

export const User = model<UserInterface, UserModel>("User", UserSchema);
