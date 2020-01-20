import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Permission } from '../permissions/permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'role_name', type: 'text', nullable: false})
  roleName: string;

  @Column({type: 'text', nullable: false})
  priority: string;

  @ManyToMany(type => Permission)
  @JoinTable({
    name: 'role_permission',
    joinColumns: [
      { name: 'role_id' },
    ],
    inverseJoinColumns: [
      { name: 'permission_id' }
    ],
  })
  permissions: Permission[];

}
