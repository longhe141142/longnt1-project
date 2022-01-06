import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { BaseE } from '../common/base';
import { RolePermission } from './rolePermission';
import { Api } from './api';
import { UserRole } from './userRole';
import { User } from './user';

@Entity('refreshToken', { schema: 'F11_N12_PRO' })
export class RefreshToken extends BaseE {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: string;



  @Column('boolean', {
    name: 'isRevoked',
  })
  isRevoked: boolean;

  @Column('varchar', {
    nullable: true,
    name: 'userId',
    length: 45,
  })
  userId: string;

  @Column('datetime', {
    name: 'expires',
  })
  expires: Date;

  @ManyToOne(()=>User,(user)=>user.refreshToken)
  public user:User
}
