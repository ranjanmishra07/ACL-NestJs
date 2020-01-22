import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Permission } from './permission.entity';
import { User } from './user.entity';
@Entity()
export class UserPermissions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.permissions, {nullable: false})
  @JoinColumn({name: 'user_id'})
  user: User;

  @OneToOne(type => Permission, permission => permission.id, {nullable: false})
  @JoinColumn({name: 'permission_id'})
  permission: Permission;

  @Column({type: 'boolean', nullable: false, default: true})
  granted: boolean;

}
