import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from './role';
import { User } from './user';
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

  @ManyToOne(() => Role, (role) => role.userRole)
  public role!: Role;

  @ManyToOne(() => User, (user) => user.userRole)
  public user!: User;
}
