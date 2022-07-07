import { UseCase } from '@core/domain/contracts/usecase';
import { VehicleRepository } from '@features/vehicles/infra/repositories';
import { CreateVehicleDTO } from '../dtos';
import { AppError } from '@core/domain/errors/app-error';

export class CreateVehicleUseCase implements UseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  async run({ licensePlate, brand, model, version, year, enable }: CreateVehicleDTO) {
    const findVehicle = await this.vehicleRepository.findByLicensePlate(licensePlate);

    if (findVehicle) {
      throw new AppError('Vehicle already exists');
    }

    const created = await this.vehicleRepository.create({
      licensePlate,
      brand,
      model,
      version,
      year,
      enable,
    });

    return created;
  }
}
