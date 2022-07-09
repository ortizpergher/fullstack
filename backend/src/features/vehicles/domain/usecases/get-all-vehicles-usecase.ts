import { UseCase } from '@core/domain/contracts/usecase';
import { VehicleRepository } from '@features/vehicles/infra/repositories';
import { VehicleList } from '../model';

export class GetAllVehiclesUseCase implements UseCase {
  constructor(private repository: VehicleRepository) {}

  async run(): Promise<VehicleList[]> {
    const vehicles = await this.repository.getAllVehicles();

    return vehicles;
  }
}
