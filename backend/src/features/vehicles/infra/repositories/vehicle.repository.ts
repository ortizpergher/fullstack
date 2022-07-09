import { pgHelper } from '@core/infra/connections/pg-helper';
import { VehicleEntity } from '@core/infra/database/entities';
import { CreateVehicleDTO } from '../../domain/dtos';
import { Vehicle, VehicleList } from '../../domain/model';

export class VehicleRepository {
  async getAllVehicles(): Promise<VehicleList[]> {
    const repository = await pgHelper.getRepository(VehicleEntity);

    const findVehicles = await repository.find();

    const vehicles: VehicleList[] = findVehicles.map((v) => ({
      id: v.id as string,
      licensePlate: v.licensePlate,
      brand: v.brand,
      model: v.model,
      version: v.version as string,
      year: v.year,
      enable: v.enable as boolean,
    }));

    return vehicles;
  }

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
