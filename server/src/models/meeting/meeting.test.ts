import mongoose, { Types } from "mongoose";
import * as database from "../../database/memory.db";
import { Meeting } from "./meeting.model";
import { Admin, Ballot, Member, Topic } from "./meeting.types";

const ADMIN: Admin = { name: "Admin", id: new Types.ObjectId() };
const MEMBER_A: Member = { name: "Member A", id: new Types.ObjectId() };
const MEMBER_B: Member = { name: "Member B", id: new Types.ObjectId() };
const BALLOT_A: Ballot = { id: MEMBER_A.id, value: 0 };
const BALLOT_B: Ballot = { id: MEMBER_B.id, value: 1 };
const TOPIC_X: Topic = {
  subject: "Topic X",
  votes: [BALLOT_A, BALLOT_B],
  id: new Types.ObjectId(),
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

describe("Meeting model", () => {
  test("create and save an instance of a meeting", async () => {
    const newMeeting = new Meeting({
      admin: ADMIN,
      members: [MEMBER_A, MEMBER_B],
      topics: [TOPIC_X],
    });
    const savedMeeting = await newMeeting.save();
    expect(savedMeeting._id).toBeDefined();
    expect(savedMeeting.admin.name).toMatch("Admin");
    expect(savedMeeting.admin.id).toBeDefined();
    expect(savedMeeting.members?.length).toBe(2);
    if (savedMeeting.topics)
      expect(savedMeeting.topics[0].votes.length).toBe(2);
  });

  test("save an instance of an invalid meeting", async () => {
    const invalidMeeting = new Meeting({});
    let error;
    try {
      await invalidMeeting.save();
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
