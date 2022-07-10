import { Controller } from '@core/presentation/contracts';
import { ok, serverError } from '@core/presentation/helpers';
import { GetAllVehiclesUseCase } from '@features/vehicles/domain/usecases';
import { Request, Response } from 'express';

export class GetAllVehiclesController implements Controller {
  constructor(private getAllVehiclesUseCase: GetAllVehiclesUseCase) {}

  async execute(_: Request, res: Response) {
    try {
      const result = await this.getAllVehiclesUseCase.run();

      return ok(res, result);
    } catch (error) {
      return serverError(res, error);
    }
  }
}
