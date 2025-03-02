import { Schema, model, Types, Document } from 'mongoose';
import { UserModel } from "@moduls/user/model"

export interface IBase extends Document {
  name: string;
  createdBy: Types.ObjectId;
}

const baseSchema: Schema = new Schema<IBase>(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.ObjectId,
      ref: UserModel,
    }
  },
  {

    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }

  }
);

export const BaseModel = model<IBase>('Base', baseSchema, 'bases');
export default BaseModel;
