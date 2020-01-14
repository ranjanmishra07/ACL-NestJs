import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { MinLength, IsEmail, IsNotEmpty } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  SUPERUSER = 'superuser',
  USER = 'user',
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
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
}
