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
  BaseEntity,
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

<<<<<<< HEAD
  @CreateDateColumn({})
  public createdAt: Date = new Date();

  @UpdateDateColumn({})
  public updatedAt: Date = new Date();
=======
  @CreateDateColumn()
  createdAt:Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
>>>>>>> 3eaa42fa177de6064ae97b59e6557cfea92fcb84
}
