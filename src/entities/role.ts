import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseE } from '../common/entities/base.entity';

@Entity('role', { schema: 'F11_N12_PRO' })
export class Employee extends BaseE {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', {
    nullable: true,
    name: 'name',
    length: 225,
  })
  name: string;

  @Column('varchar', {
    nullable: true,
    name: 'description',
    length: 225,
  })
  description: string;
}
