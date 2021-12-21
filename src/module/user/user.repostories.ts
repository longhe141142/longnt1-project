import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../../entities/user';


@EntityRepository(User)
export class UserRepository extends Repository<User> {  
  insertUser = async (userName: string, password: string,email:string, payload):Promise<User | any> => {
    console.log(payload);
    let user = new User();
    user.userName = userName;
    user.password = password;
    user.email = email
    user.address = payload?.address
    user.avatar= payload?.avatar
    user.identityNumber = payload?.identityNumber
    user.isActive = payload?.isActive
    user.phone = payload?.phone
    user.socialInsurance = payload?.socialInsurance
    user.age = payload?.age
    await this.save(user); 
    return user;
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
