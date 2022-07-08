import './config/module-alias';
import { app } from './config/app';
import { pgHelper } from '@core/infra/connections/pg-helper';

const port = 3000;

Promise.all([pgHelper.connect()])
  .then(() => {
    app.listen(port, () => console.log('Server is running on port ', port));
  })
  .catch(console.error);
