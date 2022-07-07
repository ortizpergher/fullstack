import { pgHelper } from '@core/infra/connections/pg-helper';
import { AppError } from '@core/domain/errors';
import { VehicleRepository } from '@features/vehicles/repositories/vehicle-repository';
import { CreateVehicleUseCase } from '@features/vehicles/domain/usecases';

const makeSut = () => {
  const vehicleRepository = new VehicleRepository();

  const sut = new CreateVehicleUseCase(vehicleRepository);
  return sut;
};

describe('Create Vehicle UseCase tests', () => {
  test('Should create a vehicle', async () => {
    const sut = makeSut();

    const vehicle = {
      licensePlate: 'ABC-1254',
      brand: 'Brand test',
      model: 'Model test',
      version: 'Version test',
      year: 2020,
      enable: false,
    };

    const response = await sut.run(vehicle);

    expect(response).toHaveProperty('id');
    expect(response.licensePlate).toEqual(vehicle.licensePlate);
    expect(response.brand).toEqual(vehicle.brand);
    expect(response.model).toEqual(vehicle.model);
    expect(response.year).toEqual(vehicle.year);
    expect(response.enable).toEqual(vehicle.enable);
  });

  test('Should create a vehicle enable', async () => {
    const sut = makeSut();

    const vehicle = {
      licensePlate: 'ABC-1591',
      brand: 'Brand test',
      model: 'Model test',
      version: 'Version test',
      year: 2020,
    };

    const response = await sut.run(vehicle);

    expect(response).toHaveProperty('id');
    expect(response.licensePlate).toEqual(vehicle.licensePlate);
    expect(response.brand).toEqual(vehicle.brand);
    expect(response.model).toEqual(vehicle.model);
    expect(response.year).toEqual(vehicle.year);
    expect(response.enable).toBeTruthy;
  });

  test('Should return error when license plate has already registered', async () => {
    const sut = makeSut();

    const vehicle = {
      licensePlate: 'ABC-1254',
      brand: 'Brand test',
      model: 'Model test',
      version: 'Version test',
      year: 2020,
      enable: false,
    };

    try {
      await sut.run(vehicle);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });
});
