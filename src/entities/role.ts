import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { BaseE } from '../common/base';
import { RolePermission } from './rolePermission';
import { Api } from './api';
import { UserRole } from './userRole';
import { User } from './user';

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

  @ManyToMany(() => User)
  @JoinTable({
    name: 'userRole',
    joinColumn: {
      name: 'roleId',
      referencedColumnName: 'id',
    },
  })
  users: User[];

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  public userRole!: UserRole[];
}
