import { Response, NextFunction } from "express";
import { FilterQuery } from "mongoose";
import { IBase, BaseModel } from "@modules/base/model";
import { BaseValidation } from "@modules/base/validations";
import { AuthRequest } from "@core/interfaces/";
import BaseService from "@modules/base/services";
import BaseDto from "@modules/base/dtos";
import { Constants, ErrorHandler, ResponseSuccess, toObjectId } from "@core/utils";

class BaseController {

  create = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { user } = req;
    const companyId = toObjectId(user.role.company!.id!.toString());

    const body = await BaseValidation.create.validateAsync(req.body);

    const payload: IBase = {
      company: companyId,
      created_by: toObjectId(user.id),
      ...body
    };

    const data: IBase = await BaseService.create(payload);

    return ResponseSuccess({ res: res, message: "Base Created Success", data: new BaseDto(data) });

  };

  findOne = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;
    const companyId = toObjectId(user.role.company!.id!.toString());

    const filter: FilterQuery<IBase> = { _id: toObjectId(id), company: companyId };
    const data: IBase | null = await BaseService.findOne(filter);

    if (!data) {
      return next(ErrorHandler.notFound("No Base found"));
    }

    return ResponseSuccess({
      res,
      message: "Base found",
      data: new BaseDto(data),
    });
  };

  findAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { user, query } = req
    const companyId = toObjectId(user.role.company!.id!.toString());
    const userType = user.role.name;

    const filter: FilterQuery<IBase> = { company: companyId };

    if (query.name) {
      filter["name"] = {
        $regex: new RegExp(query.name as string, 'i')
      }
    }

    const data: IBase[] = await BaseService.findOne(filter);

    return data ? ResponseSuccess({ res: res, message: "Base Found", data: data.map((x) => new BaseDto(x)) });
  };


  update = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;
    const companyId = toObjectId(user.role.company!.id!.toString());

    const body = await BaseValidation.update.validateAsync(req.body);

    const filter: FilterQuery<IBase> = { _id: toObjectId(id), company: companyId };
    const data: IBase | null = await BaseService.update(filter, body);

    if (!data) {
      return next(ErrorHandler.badRequest("Base update failed"));
    }

    return ResponseSuccess({ res, message: "Base updated successfully", data: new BaseDto(data) });
  };


  destroy = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;
    const companyId = toObjectId(user.role.company!.id!.toString());

    const filter: FilterQuery<IBase> = { _id: toObjectId(id), company: companyId };
    const data = await BaseService.destroy(filter);

    if (!data) {
      return next(ErrorHandler.badRequest("Base deletion failed"));
    }

    return ResponseSuccess({ res, message: "Base deleted successfully" });
  };
}

export default new BaseController();
