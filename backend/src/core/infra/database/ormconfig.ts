import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

let config: DataSourceOptions;
let url = '';

if (process.env.NODE_ENV?.toLocaleLowerCase() === 'test') {
  url = process.env.TEST_DATABASE_URL as string;
} else {
  url = process.env.DATABASE_URL as string;
}

config = {
  type: 'postgres',
  url,
  ssl: undefined,
  entities: ['src/core/infra/database/entities/**/*'],
  migrations: ['src/core/infra/database/migrations/**/*'],
};

export default config;
