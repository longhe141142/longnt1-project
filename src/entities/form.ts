import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseE } from '../common/entities/base.entity';

@Entity('form', { schema: 'F11_N12_PRO' })
export class Employee extends BaseE {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    nullable: true,
    name: 'receiver',
    length: 225,
  })
  receiver: string;

  @Column('int', {
    nullable: false,
    name: 'type',
  })
  lastName: Number;

  @Column('varchar', {
    nullable: true,
    name: 'userId',
    length: 45,
  })
  userId: string;

  @Column('varchar', {
    name: 'status',
    length: 45,
  })
  status: string;
  @Column('varchar', {
    name: 'feature',
    length: 220,
  })
  feature: string;

  @Column('varchar', {
    name: 'dueDate',
  })
  dueDate: Date;

  @Column('boolean', {
    name: 'isApproved',
  })
  isApproved: boolean = false;

  @Column('boolean', {
    name: 'isRejected',
  })
  isRejected: boolean = false;

  @Column('boolean', {
    name: 'isDue',
  })
  isDue: boolean = false;
}
