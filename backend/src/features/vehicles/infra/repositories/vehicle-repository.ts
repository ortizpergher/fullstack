import { pgHelper } from '@core/infra/connections/pg-helper';
import { VehicleEntity } from '@core/infra/database/entities';
import { CreateVehicleDTO } from '../../domain/dtos';
import { Vehicle } from '../../domain/model';

export class VehicleRepository {
  async findByLicensePlate(licensePlate: string): Promise<VehicleEntity | null> {
    const repository = await pgHelper.getRepository(VehicleEntity);

    return await repository.findOne({ where: { licensePlate } });
  }

  async create(vehicle: CreateVehicleDTO): Promise<Vehicle> {
    await pgHelper.openTransaction();

    try {
      const manager = pgHelper.queryRunner.manager;

      const createVehicle = manager.create(VehicleEntity, {
        licensePlate: vehicle.licensePlate,
        brand: vehicle.brand,
        model: vehicle.model,
        version: vehicle.version,
        year: vehicle.year,
        enable: vehicle.enable,
      });
      await manager.save(createVehicle);

      await pgHelper.commit();

      return createVehicle;
    } catch (err) {
      await pgHelper.rollback();

      throw err;
    } finally {
      await pgHelper.closeTransaction();
    }
  }
}
