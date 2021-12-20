import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Generated,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
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

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    nullable: true
  })
  public updatedAt: Date;
  // @BeforeInsert()
  // updateDateCreation() {
  //   this.createdAt = new Date();
  // }

  // @BeforeUpdate()
  // public setUpdatedAt() {
  //   this.updatedAt = new Date();
  // }
}
