import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { BaseE } from '../common/entities/base.entity';
import { RolePermission } from './rolePermission';
import { Api } from './api';
import { UserRole } from './userRole';

@Entity('role', { schema: 'F11_N12_PRO' })
export class Role extends BaseE {
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

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  public rolePermissions!: RolePermission[];

  @ManyToMany(() => Api)
  @JoinTable({
    name: 'role_permission',
  })
  apis: Api[];
  @OneToMany(() => UserRole, (userRole) => userRole.role)
  public userRole!: UserRole[];
}
