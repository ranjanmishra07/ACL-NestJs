import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { MinLength, IsEmail, IsNotEmpty, validate } from 'class-validator';
import { UserPermissions } from './permissions/user-permission.entity';
import { UserAccess } from './user-access.entity';

export enum UserRole {
  ADMIN = 'admin',
  SUPERUSER = 'superuser',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @MinLength(4)
  name: string;

  @Column('text')
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(type => UserPermissions, permissions => permissions.permission)
  permissions: UserPermissions[];

  @OneToMany(type => UserAccess, userAccess => userAccess.user)
  userAccess: UserAccess[];

}
