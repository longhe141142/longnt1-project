import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    nullable: true,
    name: 'name',
    length: 225,
  })
  name: string;

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
