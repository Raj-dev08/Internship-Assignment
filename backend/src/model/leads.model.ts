import mongoose, { Document, Schema } from "mongoose";

import { IUser } from "./user.model.js";

export interface ILeads extends Document {
  email: string;
  name: string;
  status: string;
  source: string;
  userId: mongoose.Types.ObjectId | IUser;

  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILeads>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["new", "contacted", "qualified", "lost"],
    },

    source: {
      type: String,
      required: true,
      enum: ["website", "referral", "instagram"],
    },

    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model<ILeads>("Lead", LeadSchema);

export default Lead;