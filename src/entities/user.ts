import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseE } from '../common/entities/base.entity';
import { UserRole } from './userRole';
import { Form } from './form';
import { Employee } from './employee';
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
    nullable: true,
    default: null,
  })
  phone: string;

  @Column('varchar', {
    name: 'address',
    nullable: true,
    default: null,
  })
  address: string;

  @Column('boolean', {
    name: 'isActive',
    nullable: true,
    default: null,
  })
  isActive: boolean = true;

  @Column('varchar', {
    name: 'identityNumber',
    length: 45,
    nullable: true,
    default: null,
  })
  identityNumber: string;

  @Column('varchar', {
    name: 'socialInsurance',
    length: 45,
    nullable: true,
    default: null,
  })
  socialInsurance: string;

  @Column('varchar', {
    name: 'avatar',
    nullable: true,
    default: null,
  })
  avatar: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  public userRole!: UserRole[];

  @OneToMany(() => Form, (form) => form.user)
  public forms!: Form[];

  @OneToMany(() => Employee, (employee) => employee.manager)
  public employees!: Employee[];

  @OneToOne(()=>Employee,(employeeData)=>employeeData.user)
  public employeeData!:Employee

}
