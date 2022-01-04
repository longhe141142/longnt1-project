import {
  EntityRepository,
  Repository,
  SelectQueryBuilder,
  EntityManager,
} from 'typeorm';
import { RolePermission } from '../../../entities/rolePermission';
import { userInformationDto } from '../../../auth/auth/dto';

@EntityRepository(RolePermission)
export class RolePermissionRepository extends Repository<RolePermission> {}
