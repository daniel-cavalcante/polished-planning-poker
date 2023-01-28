import mongoose, { model, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  name: { firstName: string; lastName: string };
  username: string;
  email: string;
  hash?: string;
}

interface IUserMethods {
  setPassword(password: string): Promise<void>;
  validatePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

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

const iterations = 10;

UserSchema.methods.setPassword = async function (password: string) {
  const result = await bcrypt.hash(password, iterations);
  this.hash = result;
};

UserSchema.methods.validatePassword = async function (password: string) {
  const result = bcrypt.compare(password, this.hash);
  return result;
};

export const User = model<IUser, UserModel>("User", UserSchema);
