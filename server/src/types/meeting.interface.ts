import { Types } from "mongoose";

export type Member = {
  name: string;
  id: Types.ObjectId;
};

export type Admin = Member;

export type Ballot = {
  id: Types.ObjectId;
  value: number;
};

export type Topic = {
  subject: string;
  votes: Ballot[];
  id: Types.ObjectId;
};

export interface IMeeting {
  admin: Admin;
  members?: Member[];
  topics?: Topic[];
}

export interface MeetingMethods {}
