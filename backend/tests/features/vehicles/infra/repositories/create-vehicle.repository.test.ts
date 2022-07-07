import { pgHelper } from '@core/infra/connections/pg-helper';
import { VehicleEntity } from '@core/infra/database/entities';
import { VehicleRepository } from '@features/vehicles/infra/repositories';

const clearEntities = async () => {
  await pgHelper.client.manager.delete(VehicleEntity, {});
};

const makeSut = () => {
  return new VehicleRepository();
};

describe('Vehicle Repository', () => {
  beforeAll(async () => {
    await pgHelper.connect();
  });

  afterAll(async () => {
    await clearEntities();
    await pgHelper.disconnect();
  });

  it('Should create and return a vehicle with id', async () => {
    const sut = makeSut();

    const createVehicle = {
      licensePlate: 'ABC-1475',
      brand: 'Brand test',
      model: 'Model test',
      version: 'Version test',
      year: 2020,
      enable: true,
    };

    const vehicle = await sut.create(createVehicle);

    expect(vehicle).toBeTruthy();
    expect(vehicle.id).toBeTruthy();
  });

  it('Should throw error and execute a rollback', async () => {
    const sut = makeSut();

    const promise = sut.create(undefined as any);

    await expect(promise).rejects.toThrow();
  });
});
