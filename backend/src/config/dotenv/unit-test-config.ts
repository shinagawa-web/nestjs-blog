import * as dotenv from 'dotenv';
import * as path from 'path';

const testEnv = dotenv.config({
  path: path.join(process.cwd(), '.env.test'),
});

Object.assign(process.env, {
  ...testEnv.parsed,
});
