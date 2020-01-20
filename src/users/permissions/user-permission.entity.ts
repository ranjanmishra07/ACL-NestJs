import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Permission } from './permission.entity';
import { User } from '../user.entity';
@Entity()
export class UserPermissions {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // @PrimaryGeneratedColumn('uuid')
  @ManyToOne(type => User, user => user.permissions)
  @JoinColumn({name: 'user_id'})
  user: User;

  @OneToOne(type => Permission, permission => permission.id)
  @JoinColumn({name: 'permission_id'})
  permission: Permission;

  @Column({type: 'boolean', nullable: false, default: true})
  granted: boolean;

}