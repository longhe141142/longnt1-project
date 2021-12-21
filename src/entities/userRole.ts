import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseE } from '../common/entities/base.entity';
@Entity('user_role', { schema: 'F11_N12_PRO' })
export class UserRole extends BaseE {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    nullable: true,
    name: 'userId',
  })
  userId: string;

  @Column('int', {
    nullable: true,
    name: 'roleId',
  })
  roleId: Number;
}
