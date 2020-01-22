import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config()


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
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
}
export const jwtConstants = {
  secret : 'TopSecret',
};
