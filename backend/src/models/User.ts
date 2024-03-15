import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const UserSchema: Schema = new Schema({
    username: {
      type: String,
      required: true,
      min: 3,
      max: 15,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 30,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 50,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
