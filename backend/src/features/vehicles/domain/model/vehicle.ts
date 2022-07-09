export interface Vehicle {
  id?: string;
  licensePlate: string;
  brand: string;
  model: string;
  version?: string;
  year: number;
  enable: boolean;
}

export interface VehicleList {
  id: string;
  licensePlate: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  enable: boolean;
}
