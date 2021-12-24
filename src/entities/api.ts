import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Generated,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { BaseE } from '../common/entities/base.entity';
import { Role} from './role'
import { RolePermission } from './rolePermission';

@Entity('api', { schema: 'F11_N12_PRO' })
export class Api extends BaseE {
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
  
  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.api)
  public rolePermissions!: RolePermission[];

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'role_permission',
  })
  roles: Role[];
}
