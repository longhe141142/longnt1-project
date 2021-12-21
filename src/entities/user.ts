import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseE } from '../common/entities/base.entity';

@Entity('user', { schema: 'F11_N12_PRO' })
export class User extends BaseE {
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
  age: Number;

  @Column('varchar', {
    name: 'email',
    length: 100,
  })
  email: string;



  @Column('varchar', {
    name: 'phone',
  })
  phone: string;



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
