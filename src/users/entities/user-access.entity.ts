import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

export enum UserAccessEntityType {
  CITY = 'city',
  REGION = 'region',
  SOCIETY = 'society',
}

@Entity()
export class UserAccess {

  // @PrimaryColumn()
  @ManyToOne(type => User, user => user.userAccess, { primary: true })
  @JoinColumn({name: 'user_id'})
  user: User;

  @PrimaryColumn({
    name: 'entity_type',
    type: 'enum',
    enum: UserAccessEntityType,
    default: UserAccessEntityType.CITY,
  })
  entityType: UserAccessEntityType;

  @PrimaryColumn({name: 'entity_id'})
  entityId: number;

  @Column({type: 'boolean', nullable: true})
  deleted: boolean;
}