// import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, PrimaryColumn, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
// import { Role } from '../roles/role.entity';
// import { Permission } from './permission.entity';
// @Entity()
// export class RolePermission {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;
//   // @PrimaryGeneratedColumn('uuid')
//   @ManyToMany(type => Permission, permission => permission.id)
//   @JoinColumn({name: 'permission_id'})
//   permission: Permission;

//   @ManyToMany(type => Role, role => role.id)
//   @JoinColumn({name: 'role_id'})
//   role: Role;

// }