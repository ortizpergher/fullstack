import { Request, Response, Router } from 'express';
import { VehicleRepository } from '@features/vehicles/infra/repositories';
import { CreateVehicleUseCase, GetAllVehiclesUseCase } from '../../domain/usecases';
import { CreateVehicleController, GetAllVehiclesController } from '../controllers';

export class VehicleRouter {
  static getRoutes() {
    const routes = Router();

    const vehicleRepository = new VehicleRepository();

    const createVehicleUseCase = new CreateVehicleUseCase(vehicleRepository);
    const getAllVehiclesUseCase = new GetAllVehiclesUseCase(vehicleRepository);

    const createVehicleController = new CreateVehicleController(createVehicleUseCase);
    const getAllVehiclesController = new GetAllVehiclesController(getAllVehiclesUseCase);

    routes.post('/', (req: Request, res: Response) => createVehicleController.execute(req, res));

    routes.get('/', (req: Request, res: Response) => getAllVehiclesController.execute(req, res));

    return routes;
  }
}
