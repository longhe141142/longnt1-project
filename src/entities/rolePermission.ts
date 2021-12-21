import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
<<<<<<< HEAD
import {BaseE} from '../common/entities/base.entity'

@Entity('role_permission', { schema: 'F11_N12_PRO' })
@Entity()
export class RolePermission extends BaseE{
=======
import { BaseE } from 'src/common/entities/base.entity';
@Entity('role_permission', { schema: 'F11_N12_PRO' })
@Entity()
export class RolePermission extends BaseE {
>>>>>>> 3eaa42fa177de6064ae97b59e6557cfea92fcb84
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
