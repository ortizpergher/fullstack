import { Request, Response, Router } from 'express';
import { VehicleRepository } from '@features/vehicles/infra/repositories';
import { CreateVehicleUseCase } from '../../domain/usecases';
import { CreateVehicleController } from '../controllers';

export class VehicleRouter {
  static getRoutes() {
    const routes = Router();

    const vehicleRepository = new VehicleRepository();

    const createVehicleUseCase = new CreateVehicleUseCase(vehicleRepository);

    const createVehicleController = new CreateVehicleController(createVehicleUseCase);

    routes.post('/', (req: Request, res: Response) => createVehicleController.execute(req, res));

    routes.get('/', (_: Request, res: Response) => {
      res.send('Rota de veículos Ok!');
    });

    return routes;
  }
}
