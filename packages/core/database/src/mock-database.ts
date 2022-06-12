import { merge, uid } from '@znewbee/utils';
import { resolve } from 'path';
import { Database, IDatabaseOptions } from './database';

export class MockDatabase extends Database {
  constructor(options: IDatabaseOptions) {
    super({
      storage: ':memory:',
      tablePrefix: `mock_${uid(6)}_`,
      dialect: 'sqlite',
      ...options,
    });
    this.sequelize.beforeDefine((model, opts) => {
      opts.tableName = `${this.getTablePrefix()}${opts.tableName || opts.modelName || opts.name.plural}`;
    });
  }
}

export function getConfigByEnv() {
  return {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DB_LOGGING === 'on' ? console.log : false,
    storage:
      process.env.DB_STORAGE && process.env.DB_STORAGE !== ':memory:'
        ? resolve(process.cwd(), process.env.DB_STORAGE)
        : ':memory:',
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
  };
}

export function mockDatabase(options: IDatabaseOptions = {}): MockDatabase {
  const dbOptions = merge(getConfigByEnv(), options);
  return new MockDatabase(dbOptions);
}
