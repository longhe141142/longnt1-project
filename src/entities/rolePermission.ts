import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role_permission', { schema: 'F11_N12_PRO' })
@Entity()
export class RolePermission {
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
