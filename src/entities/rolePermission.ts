import { Column, Entity, PrimaryGeneratedColumn,ManyToOne } from 'typeorm';
import { BaseE } from 'src/common/entities/base.entity';
import { Role} from './role'
import { Api} from './api'

@Entity('role_permission', { schema: 'F11_N12_PRO' })
export class RolePermission extends BaseE {
  @PrimaryGeneratedColumn('uuid')
  id: string;


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

  @ManyToOne(() => Role, role => role.rolePermissions)
  public role!: Role;

  @ManyToOne(() => Api, api => api.rolePermissions)
  public api!: Api;
}
