import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmPostgreConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'octo-nest',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

export const typeOrmMongoConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'octo-nest',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
};
