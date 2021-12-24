import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { BaseE } from '../common/entities/base.entity';
import { Form } from './form';

@Entity('form_detail', { schema: 'F11_N12_PRO' })
export class FormDetail extends BaseE {
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

  @OneToOne(() => Form, (form) => form.formDetail)
  public form!: Form;
}
