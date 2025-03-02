import { FilterQuery } from "mongoose";
import AsdfModel, { IAsdf, IAsdfDocument } from "../models/folder-model";

class AsdfService {
  
  create = async (data: IAsdf): Promise<IAsdfDocument> => {
    return await AsdfModel.create(data);
  };

  findOne = async (filter: FilterQuery<IAsdf>): Promise<IAsdfDocument | null> => {
    return await AsdfModel.findOne(filter);
  };

  findAll = async (filter: FilterQuery<IAsdf>): Promise<IAsdfDocument[]> => {
    return await AsdfModel.find(filter);
  };

  update = async (
    filter: FilterQuery<IAsdf>, 
    data: Partial<IAsdf>
  ): Promise<IAsdfDocument | null> => {
    return await AsdfModel.findOneAndUpdate(filter, data, { new: true });
  };

  destroy = async (filter: FilterQuery<IAsdf>): Promise<{ deletedCount?: number }> => {
    return await AsdfModel.deleteMany(filter);
  };
}

export default new AsdfService();
