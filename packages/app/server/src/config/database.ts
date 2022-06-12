import { IDatabaseOptions } from '@znewbee/database';

export default {
  logging: process.env.DB_LOGGING === 'on' ? console.log : false,
  dialect: process.env.DB_DIALECT as any,
  storage: process.env.DB_STORAGE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any,
} as IDatabaseOptions;
