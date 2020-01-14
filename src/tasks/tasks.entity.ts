import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({type: 'text', nullable: true})
  description: string;

  @Column({nullable: true})
  taskNumber: number;

  @Column({nullable: true})
  taskType: string;
}
