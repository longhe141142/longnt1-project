import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Role } from '../../entities/role';

@EntityRepository(Role)
export class RoleRopsitory extends Repository<Role> {
  api = 'apis';
  rolePermissions = 'rolePermissions'

  getApi = async (): Promise<any> => {
    return await this.find({
      relations: [this.api],
    });
  };

  
}
