import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    nullable: true,
    name: 'name',
    length: 225,
  })
  name: string;

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
