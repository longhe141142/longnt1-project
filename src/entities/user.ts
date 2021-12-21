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
<<<<<<< HEAD
  email: string = 'admin@gmail.com';
=======
  email: string;


>>>>>>> 3eaa42fa177de6064ae97b59e6557cfea92fcb84

  @Column('varchar', {
    name: 'phone',
    nullable: true,
    default: null
  })
<<<<<<< HEAD
  phone: string = null;
=======
  phone: string;


>>>>>>> 3eaa42fa177de6064ae97b59e6557cfea92fcb84

  @Column('varchar', {
    name: 'address',
    nullable: true,
    default: null
  })
  address: string;

  @Column('boolean', {
    name: 'isActive',
    nullable: true,
    default: null
  })
  isActive: boolean = true;

  @Column('varchar', {
    name: 'identityNumber',
    length: 45,
    nullable: true,
    default: null
  })
  identityNumber: string;

  @Column('varchar', {
    name: 'socialInsurance',
    length: 45,
    nullable: true,
    default: null
  })
  socialInsurance: string;

  @Column('varchar', {
    name: 'avatar',
    nullable: true,
    default: null
  })
  avatar: string;
}
