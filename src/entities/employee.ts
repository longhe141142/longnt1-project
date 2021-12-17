import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { RegValidation } from '../common/untils/reg.validation';

export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    nullable: false,
    name: 'url',
    length: 70,
  })
  url: string;

  @Column('varchar', {
    nullable: false,
    name: 'lastName',
    length: 100,
  })
  lastName: string;

  @Column('varchar', {
    nullable: false,
    name: 'firstName',
    length: 100,
  })
  firstName: string;

  @Column('varchar', {
    name: 'fullName',
  })
  fullName: string;
  @Column('varchar', {
    name: 'feature',
    length: 220,
  })
  feature: string;

  @Column('varchar', {
    name: 'userId',
    length: 45,
  })
  userId: string;

  @Column('varchar', {
    name: 'managerId',
    length: 45,
  })
  managerId: string;

  @BeforeInsert()
  public setFullName() {
    let fullName = `${this.firstName} ${this.lastName}`;
    fullName = RegValidation.validateWhiteSpace(fullName)
      ? fullName
      : RegValidation.deleteWhiteSpace(fullName);
  }
}
