import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseE } from '../common/entities/base.entity';


@Entity('form_detail', { schema: 'F11_N12_PRO' })
export class Employee extends BaseE {
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
