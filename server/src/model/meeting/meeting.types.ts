import { Types } from "mongoose";

export type Member = {
  name: string;
  id: Types.ObjectId;
};

export type Admin = Member;

export interface MeetingInterface {
  admin: Admin;
  members?: Member[];
  topics?: [
    {
      subject: string;
      votes: [
        {
          id: Types.ObjectId;
          value: number;
        }
      ];
      id: Types.ObjectId;
    }
  ];
}

export interface MeetingMethods {}
