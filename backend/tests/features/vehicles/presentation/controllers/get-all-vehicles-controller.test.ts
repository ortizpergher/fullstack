import request from 'supertest';
import { app } from '@main/config/app';
import { pgHelper } from '@core/infra/connections/pg-helper';
import { VehicleList } from '@features/vehicles/domain/model';
import { VehicleEntity } from '@core/infra/database/entities';
import { Controller } from '@core/presentation/contracts';
import { GetAllVehiclesUseCase } from '@features/vehicles/domain/usecases';
import { VehicleRepository } from '@features/vehicles/infra/repositories';
import { GetAllVehiclesController } from '@features/vehicles/presentation/controllers';

const makeVehicle = async (licensePlate: string): Promise<VehicleEntity> => {
  await pgHelper.openTransaction();
  const manager = pgHelper.queryRunner.manager;

  const vehicle = manager.create(VehicleEntity, {
    licensePlate,
    brand: 'Vehicle Brand',
    model: 'Vehicle model',
    version: 'Vehicle version',
    year: 2000,
    enable: true,
  });

  await manager.save(vehicle);

  await pgHelper.commit();

  return vehicle;
};

const clearEntities = async () => {
  await pgHelper.client.manager.delete(VehicleEntity, {});
};

describe('Get All Vehicles Controller', () => {
  beforeAll(async () => {
    await pgHelper.connect();
    await clearEntities();
  });

  beforeEach(() => {
    clearEntities();
  });

  afterAll(async () => {
    clearEntities();
    await pgHelper.disconnect();
  });

  it('should be able to list all vehicles', async () => {
    const vehicle = await makeVehicle('IRC-4869');

    const response = await request(app).get('/vehicles');

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy;
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data).toEqual([
      {
        id: vehicle.id,
        licensePlate: vehicle.licensePlate,
        brand: vehicle.brand,
        model: vehicle.model,
        version: vehicle.version,
        year: vehicle.year,
        enable: vehicle.enable,
      },
    ] as VehicleList[]);
  });

  it('should be able to list all vehicles', async () => {
    const vehicle = await makeVehicle('ABC-1E14');

    const response = await request(app).get('/vehicles');

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy;
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data).toEqual([
      {
        id: vehicle.id,
        licensePlate: vehicle.licensePlate,
        brand: vehicle.brand,
        model: vehicle.model,
        version: vehicle.version,
        year: vehicle.year,
        enable: vehicle.enable,
      },
    ] as VehicleList[]);
  });

  it('Should return a empty list', async () => {
    await request(app)
      .get('/vehicles')
      .expect(200)
      .expect((response) => {
        expect(response.body.data).toEqual([]);
      });
  });
});
