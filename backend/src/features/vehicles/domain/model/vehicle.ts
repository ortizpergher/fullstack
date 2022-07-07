export interface Vehicle {
  uid?: string;
  licensePlate: string;
  brand: string;
  model: string;
  version?: string;
  year: number;
  enable: boolean;
}
