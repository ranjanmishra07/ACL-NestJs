import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable, JoinColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Permission } from './permission.entity';
import { UserRole } from './user-roles.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn({type: 'integer'})
  id: string;

  @Column({name: 'role_name', type: 'text', nullable: false})
  roleName: string;

  @Column({ nullable: false, unique: true })
  priority: number;

  @OneToMany(type=> UserRole, userRole => userRole.role)
  userRole: UserRole[];

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
