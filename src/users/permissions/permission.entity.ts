import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column({unique: true, nullable: false})
  pcode: string;

  @IsNotEmpty()
  @Column({name: 'permission_name', type: 'text', nullable: false})
  permissionName: string;

}
