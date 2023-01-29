import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

mongoose.set("strictQuery", true);

beforeAll(async () => {
  // put your client connection code here, example with mongoose:
  if (URI) {
    await mongoose.connect(URI);
  }
});

afterAll(async () => {
  // put your client disconnection code here, example with mongodb:
  await mongoose.disconnect();
});
