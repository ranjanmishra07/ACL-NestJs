import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from '../user.entity';
import { Role } from './role.entity';
@Entity()
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // @PrimaryGeneratedColumn('uuid')
  @OneToOne(type => User, user => user.id)
  @JoinColumn({name: 'user_id'})
  user: User;

  @OneToOne(type => Role, role => role.id)
  @JoinColumn({name: 'role_id'})
  role: Role;

}
