import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_role', { schema: 'F11_N12_PRO' })
export class UserRole {
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
