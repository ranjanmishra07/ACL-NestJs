import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'octo-nest',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

export const googleSecret = {
  clientID: "clientId",
  clientSecret: "secret",
}

export const jwtConstants = {
  secret : 'TopSecret'
}

