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
  
    @Column('tinyint', {
      nullable: false,
      default: () => true,
      name: `isDeleted`,
    })
    isDeleted: boolean = false;
  
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
    createdAt: Date = new Date();
  
    @UpdateDateColumn()
    updatedAt: Date = new Date();
  
    constructor(fields?: Partial<BaseE | any>) {
      super();
      if (fields) {
        Object.assign(this, fields);
      }
    }
  }
  