import { Column, Entity, PrimaryGeneratedColumn, Generated } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';

@Entity('api', { schema: 'F11_N12_PRO' })
export class Api extends BaseEntity {
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
    name: 'method',
    length: 35,
  })
  method: string;

  @Column('varchar', {
    nullable: false,
    name: 'router',
    length: 45,
  })
  router: string;

  @Column('varchar', {
    name: 'feature',
    length: 220,
  })
  feature: string;

  @Column('varchar', {
    name: 'description',
    length: 220,
  })
  description: string;
}
