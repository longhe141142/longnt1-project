import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {BaseE} from '../common/entities/base.entity'

@Entity('role_permission', { schema: 'F11_N12_PRO' })
@Entity()
export class RolePermission extends BaseE{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', {
    name: 'roleId',
  })
  name: Number;

  @Column('int', {
    nullable: true,
    name: 'roleId',
  })
  roleId: Number;

  @Column('varchar', {
    nullable: true,
    name: 'apiId',
  })
  apiId: string;
}
