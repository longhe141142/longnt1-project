import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Generated,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @Column('boolean', {
    nullable: false,
    default: () => false,
    name: 'isDeleted',
  })
  isDeleted: boolean;

  @Column('varchar', {
    nullable: true,
    default: () => 'admin',
    name: 'createdBy',
  })
  createdBy: string;

  @Column('varchar', {
    nullable: true,
    default: () => 'admin',
    name: 'updatedBy',
  })
  updatedBy: string;

  @Column('datetime', { name: 'createdAt' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
