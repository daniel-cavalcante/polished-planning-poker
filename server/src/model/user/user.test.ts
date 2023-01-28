import mongoose from "mongoose";
import { UserInterface, User } from "./user.model";
import * as database from "../../database/memory.db";

const USER: UserInterface = {
  name: { firstName: "John", lastName: "Doe" },
  username: "johndoe42",
  email: "johndoe@example.com",
};

beforeAll(async () => {
  await database.setUp();
});

afterEach(async () => {
  await database.dropCollections();
});

afterAll(async () => {
  await database.dropDatabase();
});

describe("User model", () => {
  test("create and save an instance of an user", async () => {
    const newUser = new User(USER);
    const savedUser = await newUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(USER.username);
    expect(savedUser.email).toBe(USER.email);
  });

  test("save an instance of an invalid user", async () => {
    const invalidUser = new User({ username: USER.name });
    let error;
    try {
      await invalidUser.save();
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  test("setPassword and validatePassword method", async () => {
    const newUser = new User(USER);
    expect(newUser.hash).toBeUndefined();
    await newUser.setPassword("1234");
    expect(await newUser.validatePassword("1234")).toBe(true);
    expect(await newUser.validatePassword("abcd")).toBe(false);
  });
});
