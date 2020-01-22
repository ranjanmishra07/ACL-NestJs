import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'octo-nest',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
};

export const googleSecret = {
  clientID: 'secret',
  clientSecret: 'secret',
};

export const jwtConstants = {
  secret : 'TopSecret',
};
