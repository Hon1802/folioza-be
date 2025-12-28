import { boolean } from 'boolean';
import { types } from 'pg';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

require('dotenv').config({ override: true });

types.setTypeParser(20, Number);
types.setTypeParser(types.builtins.NUMERIC, (value: string): number =>
  parseFloat(value),
);

let config: DataSourceOptions & PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrationsRun: false,
  migrations: ['dist/migrations/*.js'],
  logger: 'simple-console',
  logging: boolean(process.env.SHOW_SQL),
  migrationsTransactionMode: 'all',
};

export const dataSource = new DataSource(config);
