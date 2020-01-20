import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
@Entity()
export class UserRole {

  @OneToOne(type => User, user => user.id, {primary: true})
  @JoinColumn({name: 'user_id'})
  user: User;

  @OneToOne(type => Role, role => role.id, {primary: true})
  @JoinColumn({name: 'role_id'})
  role: Role;

}
