import { model, Document, Schema } from "mongoose";

type UserRole = "ADMIN" | "CLIENT";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: UserRole;
}

const UserSchema = new Schema<IUser>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

export default model<IUser>("User", UserSchema);
