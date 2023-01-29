import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

mongoose.set("strictQuery", true);

beforeAll(async () => {
  if (URI) {
    await mongoose.connect(URI);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});
