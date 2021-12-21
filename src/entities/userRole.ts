import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
<<<<<<< HEAD
import { BaseE} from '../common/entities/base.entity'
=======
import { BaseE } from '../common/entities/base.entity';
>>>>>>> 3eaa42fa177de6064ae97b59e6557cfea92fcb84
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
}
