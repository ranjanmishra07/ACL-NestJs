import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable, JoinColumn, PrimaryColumn } from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn({type: 'integer'})
  id: string;

  @Column({name: 'role_name', type: 'text', nullable: false})
  roleName: string;

  @Column({ nullable: false, unique: true })
  priority: number;

  @ManyToMany(type => Permission)
  @JoinTable({
    name: 'role_permission',
    joinColumns: [
      { name: 'role_id' },
    ],
    inverseJoinColumns: [
      { name: 'permission_id' },
    ],
  })
  permissions: Permission[];

}
