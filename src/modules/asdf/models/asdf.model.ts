import { Schema, model, Types, Document } from 'mongoose';
import { UserModel } from "@moduls/user/model"

export interface IAsdf extends Document {
  name: string;
  createdBy: Types.ObjectId;
}

const asdfSchema: Schema = new Schema<IAsdf>(
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

export const AsdfModel = model<IAsdf>('Asdf', asdfSchema, 'asdfs');
export default AsdfModel;
