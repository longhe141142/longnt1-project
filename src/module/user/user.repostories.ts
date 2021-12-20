import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../../entities/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // alias = 'User';
  insertUser = async () => {
    let user = new User();
    user.password = 'l8019454';
    user.userName = 'longnt1';
    await this.save(user);
  };
}
