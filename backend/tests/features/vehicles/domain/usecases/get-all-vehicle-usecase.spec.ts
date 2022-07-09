import { pgHelper } from '@core/infra/connections/pg-helper';
import { VehicleRepository } from '@features/vehicles/infra/repositories';
import { GetAllVehiclesUseCase } from '@features/vehicles/domain/usecases';
import { VehicleEntity } from '@core/infra/database/entities';

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

const clearEntities = async () => {
  await pgHelper.client.manager.delete(VehicleEntity, {});
};

const makeSut = () => {
  const repository = new VehicleRepository();
  const sut = new GetAllVehiclesUseCase(repository);
  return { sut, repository };
};

describe('GetAllVehicles Usecase', () => {
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

  it('Should call GetAllVehiclesRepository', async () => {
    const { sut, repository } = makeSut();
    const GetAllVehiclesUseCase = jest.spyOn(repository, 'getAllVehicles');

    await sut.run();

    expect(GetAllVehiclesUseCase).toHaveBeenCalled();
  });

  it('Should be able to list all vehicles', async () => {
    const vehicle = await makeVehicle();

    const { repository } = makeSut();
    const vehicles = await repository.getAllVehicles();

    expect(vehicles[0].id).toEqual(vehicle.id);
    expect(vehicles[0].licensePlate).toEqual(vehicle.licensePlate);
    expect(vehicles[0].brand).toEqual(vehicle.brand);
  });

  it('Should return success result', async () => {
    const { sut } = makeSut();

    const result = await sut.run();

    expect(result).toEqual([]);
  });
});
