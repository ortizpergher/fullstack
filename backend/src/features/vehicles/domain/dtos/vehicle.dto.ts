export interface CreateVehicleDTO {
  licensePlate: string;
  brand: string;
  model: string;
  version?: string;
  year: number;
  enable?: boolean;
}
