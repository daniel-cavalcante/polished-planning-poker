export interface IUser {
  name: { firstName: string; lastName: string };
  username: string;
  email: string;
  hash?: string;
}

export interface UserMethods {
  setPassword(password: string): Promise<void>;
  validatePassword(password: string): Promise<boolean>;
}
