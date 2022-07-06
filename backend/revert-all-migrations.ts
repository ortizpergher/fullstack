import { datasource } from './src/database/typeorm';

(async () => {
  await datasource.initialize();
  await datasource.dropDatabase();
})();
