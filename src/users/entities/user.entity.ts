import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { MinLength, IsEmail, IsNotEmpty, validate } from 'class-validator';
import { UserPermissions } from './user-permission.entity';
import { UserAccess } from './user-access.entity';
import { UserRole } from './user-roles.entity';

// export enum UserRole {
//   ADMIN = 'admin',
//   SUPERUSER = 'superuser',
//   USER = 'user',
// }

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(4)
  name: string;

  @Column('text')
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @OneToMany(type => UserPermissions, permissions => permissions.permission)
  permissions: UserPermissions[];

  @OneToMany(type => UserAccess, userAccess => userAccess.user)
  userAccess: UserAccess[];

  @OneToMany(type => UserRole, userRole => userRole.user)
  userRole: UserRole[];


}
