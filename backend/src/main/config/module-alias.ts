import 'dotenv/config';
import { addAlias } from 'module-alias';
import { resolve } from 'path';

addAlias('@main', resolve('./src/main'));
addAlias('@core', resolve('./src/core'));
addAlias('@features', resolve('./src/features'));
