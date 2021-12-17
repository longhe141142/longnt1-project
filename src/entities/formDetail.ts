import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';

export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    nullable: false,
    name: 'formId',
    length: 45,
  })
  formId: string;

  @Column('varchar', {
    nullable: true,
    name: 'content',
    length: 225,
  })
  content: string;

  @Column('varchar', {
    nullable: true,
    name: 'managerComment',
    length: 225,
  })
  managerComment: string;
}
