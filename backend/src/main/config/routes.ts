import express from 'express';
import { VehicleRouter } from '@features/vehicles/presentation/routes';

export const makeRoutes = (app: express.Application) => {
  app.use('/vehicles', VehicleRouter.getRoutes());
};
