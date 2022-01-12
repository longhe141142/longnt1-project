import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseE } from '../common/base';
import { FormDetail } from './formDetail';
import {User } from './user'
@Entity('form', { schema: 'F11_N12_PRO' })
export class Form extends BaseE {
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
    name: 'userId',
    // length: 36,
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

  @Column('tinyint', {
    name: 'isApproved',
  })
  isApproved: boolean = false;

  @Column('tinyint', {
    name: 'isRejected',
  })
  isRejected: boolean = false;

  @Column('tinyint', {
    name: 'isDue',
  })
  isDue: boolean = false;

  @OneToOne(() => FormDetail, (formDetail) => formDetail.form)
  public formDetail!: FormDetail;

  @ManyToOne(()=>User,(user)=>user.forms)
  public user!: User
}
