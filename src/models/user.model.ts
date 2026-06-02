import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = model<IUser>("User", userSchema);

export default User;
