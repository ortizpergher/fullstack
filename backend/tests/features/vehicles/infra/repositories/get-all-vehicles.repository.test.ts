import { pgHelper } from '@core/infra/connections/pg-helper';
import { VehicleEntity } from '@core/infra/database/entities';
import { VehicleRepository } from '@features/vehicles/infra/repositories';

const clearEntities = async () => {
  await pgHelper.client.manager.delete(VehicleEntity, {});
};

const makeVehicle = async (enable?: boolean): Promise<VehicleEntity> => {
  await pgHelper.openTransaction();
  const manager = pgHelper.queryRunner.manager;

  const vehicle = manager.create(VehicleEntity, {
    licensePlate: 'III-1000',
    brand: 'Vehicle Brand',
    model: 'Vehicle model',
    version: 'Vehicle version',
    year: 2000,
    enable,
  });

  await manager.save(vehicle);

  await pgHelper.commit();

  return vehicle;
};

const makeSut = () => {
  return new VehicleRepository();
};

describe('Get All Vehicle Repository', () => {
  beforeAll(async () => {
    await pgHelper.connect();
    await clearEntities();
  });

  afterEach(async () => {
    await clearEntities();
  });

  afterAll(async () => {
    await clearEntities();
    await pgHelper.disconnect();
  });

  it('Should get all vehicles', async () => {
    const sut = makeSut();

    const vehicle = await makeVehicle();

    const result = await sut.getAllVehicles();

    expect(result).toBeTruthy();
    expect(result).toHaveLength(1);
    expect(result).toEqual([
      {
        id: vehicle.id,
        licensePlate: vehicle.licensePlate,
        brand: vehicle.brand,
        model: vehicle.model,
        version: vehicle.version,
        year: vehicle.year,
        enable: vehicle.enable,
      },
    ]);
  });

  it('Should return a empty list', async () => {
    const sut = makeSut();

    const result = await sut.getAllVehicles();

    expect(result).toBeTruthy();
    expect(result).toEqual([]);
  });

  it('Should be able to create a vehicle disabled', async () => {
    const sut = makeSut();

    await makeVehicle(false);

    const result = await sut.getAllVehicles();

    expect(result[0].enable).toBeFalsy();
  });
});
