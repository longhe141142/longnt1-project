import {
  EntityRepository,
  Repository,
  SelectQueryBuilder,
  EntityManager,
} from 'typeorm';
import { UserRole } from '../../../entities/userRole';

@EntityRepository(UserRole)
export class UserRoleRepository extends Repository<UserRole> {
   test() {
    console.log('hiiiiiiiiii');
  }

  
}
