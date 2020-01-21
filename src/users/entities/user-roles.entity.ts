import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id : number


  @ManyToOne(type => User, user => user.id)
  @JoinColumn({name: 'user_id'})
  user: User;

  @ManyToOne(type => Role, role => role.userRole)
  @JoinColumn({name: 'role_id'})
  role: Role;

}
