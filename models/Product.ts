import { Schema, model, Document, PopulatedDoc } from "mongoose";
import { IUser } from "./User";

export interface IProduct extends Document {
  title: string;
  price: number;
  imagePath?: string;
  description: string;
  quantity_available?: number;
  creatorId: PopulatedDoc<IUser & Document>;
}

const ProductSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imagePath: String,
  description: {
    type: String,
    required: true,
  },
  quantity_available: {
    type: Number,
    default: 0,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default model<IProduct>("Product", ProductSchema);
