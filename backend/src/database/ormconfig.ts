import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

let config: DataSourceOptions;
let url = process.env.DATABASE_URL;

if (process.env.NODE_ENV?.toLocaleLowerCase() === 'test') {
  url = process.env.TEST_DATABASE_URL;
}

config = {
  type: 'postgres',
  url,
  ssl: undefined,
  entities: ['src/database/entities/**/*'],
  migrations: ['src/database/migrations/**/*'],
};

export default config;
