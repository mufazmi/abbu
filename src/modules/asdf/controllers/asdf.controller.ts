import { Response, NextFunction } from "express";
import { FilterQuery } from "mongoose";
import { IAsdf, AsdfModel } from "@modules/asdf/model";
import { AsdfValidation } from "@modules/asdf/validations";
import { AuthRequest } from "@core/interfaces/";
import AsdfService from "@modules/asdf/services";
import AsdfDto from "@modules/asdf/dtos";
import { Constants, ErrorHandler, ResponseSuccess, toObjectId } from "@core/utils";

class AsdfController {

  create = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { user } = req;
    const companyId = toObjectId(user.role.company!.id!.toString());

    const body = await AsdfValidation.create.validateAsync(req.body);

    const payload: IAsdf = {
      company: companyId,
      created_by: toObjectId(user.id),
      ...body
    };

    const data: IAsdf = await AsdfService.create(payload);

    return ResponseSuccess({ res: res, message: "Asdf Created Success", data: new AsdfDto(data) });

  };

  findOne = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;
    const companyId = toObjectId(user.role.company!.id!.toString());

    const filter: FilterQuery<IAsdf> = { _id: toObjectId(id), company: companyId };
    const data: IAsdf | null = await AsdfService.findOne(filter);

    if (!data) {
      return next(ErrorHandler.notFound("No Asdf found"));
    }

    return ResponseSuccess({
      res,
      message: "Asdf found",
      data: new AsdfDto(data),
    });
  };

  findAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { user, query } = req
    const companyId = toObjectId(user.role.company!.id!.toString());
    const userType = user.role.name;

    const filter: FilterQuery<IAsdf> = { company: companyId };

    if (query.name) {
      filter["name"] = {
        $regex: new RegExp(query.name as string, 'i')
      }
    }

    const data: IAsdf[] = await AsdfService.findOne(filter);

    return data ? ResponseSuccess({ res: res, message: "Asdf Found", data: data.map((x) => new AsdfDto(x)) });
  };


  update = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;
    const companyId = toObjectId(user.role.company!.id!.toString());

    const body = await AsdfValidation.update.validateAsync(req.body);

    const filter: FilterQuery<IAsdf> = { _id: toObjectId(id), company: companyId };
    const data: IAsdf | null = await AsdfService.update(filter, body);

    if (!data) {
      return next(ErrorHandler.badRequest("Asdf update failed"));
    }

    return ResponseSuccess({ res, message: "Asdf updated successfully", data: new AsdfDto(data) });
  };


  destroy = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;
    const companyId = toObjectId(user.role.company!.id!.toString());

    const filter: FilterQuery<IAsdf> = { _id: toObjectId(id), company: companyId };
    const data = await AsdfService.destroy(filter);

    if (!data) {
      return next(ErrorHandler.badRequest("Asdf deletion failed"));
    }

    return ResponseSuccess({ res, message: "Asdf deleted successfully" });
  };
}

export default new AsdfController();
