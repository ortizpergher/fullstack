import { DataSource } from 'typeorm';
import config from './ormconfig';

export const datasource = new DataSource(config);
