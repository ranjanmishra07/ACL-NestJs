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
  clientID: "822165741217-0j91462j93h09fur82gmlfjeucdbthpd.apps.googleusercontent.com",
  clientSecret: "LuaazKrjVjq3aqj_vbbiV5gp",
}

export const jwtConstants = {
  secret : 'TopSecret'
}

