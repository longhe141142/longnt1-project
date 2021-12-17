import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';

export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    nullable: true,
    name: 'userName',
    length: 225,
  })
  userName: string;

  @Column('varchar', {
    nullable: false,
    name: 'password',
    length: 100,
  })
  password: string;

  @Column('int', {
    nullable: true,
    name: 'age',
  })
  userId: Number;

  @Column('varchar', {
    name: 'email',
    length: 100,
  })
  email: string;

  @Column('varchar', {
    name: 'feature',
    length: 220,
  })
  feature: string;

  @Column('varchar', {
    name: 'phone',
  })
  phone: string;

  @Column('boolean', {
    name: 'isApproved',
  })
  isApproved: boolean = false;

  @Column('varchar', {
    name: 'address',
  })
  address: string;

  @Column('boolean', {
    name: 'isActive',
  })
  isActive: boolean = true;

  @Column('varchar', {
    name: 'identityNumber',
    length: 45,
  })
  identityNumber: string;

  @Column('varchar', {
    name: 'socialInsurance',
    length: 45,
  })
  socialInsurance: string;

  @Column('varchar', {
    name: 'avatar',
  })
  avatar: string;
}
