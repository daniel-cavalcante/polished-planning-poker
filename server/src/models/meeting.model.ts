import { Model, model, Schema } from "mongoose";
import { IMeeting, MeetingMethods } from "../types/meeting.interface";

interface MeetingModel extends Model<IMeeting, {}, MeetingMethods> {}

const MeetingSchema = new Schema<IMeeting, MeetingModel, MeetingMethods>({
  admin: {
    type: { name: String, id: Schema.Types.ObjectId },
    required: true,
  },
  members: [{ name: String, id: Schema.Types.ObjectId }],
  topics: [
    {
      subject: String,
      votes: [
        {
          it: Schema.Types.ObjectId,
          value: Number,
        },
      ],
      id: Schema.Types.ObjectId,
    },
  ],
});

export const Meeting = model<IMeeting, MeetingModel>("Meeting", MeetingSchema);
