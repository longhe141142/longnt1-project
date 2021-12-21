import { async } from 'rxjs';
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

  getUser = async () => {
    return await this.createQueryBuilder('user').select([
      `user.id`,
      `user.email`,
      `user.age`,
      `user.phone`,
      `user.userName`,
    ]);
  };
}
