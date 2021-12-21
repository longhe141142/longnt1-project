import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Generated,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseE extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | Number;

  @Column('boolean', {
    nullable: false,
    default: () => false,
    name: 'isDeleted',
  })
  isDeleted: boolean;

  @Column('varchar', {
    nullable: true,
    name: 'createdBy',
  })
  createdBy: string;

  @Column('varchar', {
    nullable: true,
    name: 'updatedBy',
  })
  updatedBy: string;

  @CreateDateColumn()
  createdAt:Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
