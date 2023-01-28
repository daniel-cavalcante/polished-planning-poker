import { Model, model, Schema } from "mongoose";
import { MeetingInterface, MeetingMethods, Member } from "./meeting.types";

interface MeetingModel extends Model<MeetingInterface, {}, MeetingMethods> {}

const MeetingSchema = new Schema<
  MeetingInterface,
  MeetingModel,
  MeetingMethods
>({
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

export const Meeting = model<MeetingInterface, MeetingModel>(
  "Meeting",
  MeetingSchema
);
export { MeetingInterface };
