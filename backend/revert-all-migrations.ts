import { datasource } from './src/core/infra/database/typeorm';

(async () => {
  await datasource.initialize();
  await datasource.dropDatabase();
})();
