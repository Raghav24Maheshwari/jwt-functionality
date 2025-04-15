import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../otp/entities/*{.ts,.js}'],
  migrations: [__dirname + '/../otp/migrations/*{.ts,.js}'],  
  synchronize: false,
  logging: true,
};

export const AppDataSource = new DataSource(typeOrmConfig);
