import { Request, Response } from 'express';
import { Controller } from '@core/presentation/contracts';
import { MissingFieldError } from '@core/presentation/errors';
import { ok, serverError } from '@core/presentation/helpers/http-handler';
import { CreateVehicleUseCase } from '@features/vehicles/domain/usecases';

export class CreateVehicleController implements Controller {
  constructor(private createVehicleUseCase: CreateVehicleUseCase) {}

  async execute(req: Request, res: Response) {
    try {
      const { licensePlate, brand, model, year, enable, version } = req.body;

      if (!licensePlate) {
        throw new MissingFieldError('licensePlate');
      }

      if (!brand) {
        throw new MissingFieldError('brand');
      }

      if (!model) {
        throw new MissingFieldError('model');
      }

      if (!year) {
        throw new MissingFieldError('year');
      }

      const create = await this.createVehicleUseCase.run({
        licensePlate,
        brand,
        model,
        year,
        enable,
        version,
      });

      return ok(res, create);
    } catch (error) {
      return serverError(res, error);
    }
  }
}
