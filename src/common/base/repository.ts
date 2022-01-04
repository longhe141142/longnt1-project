import {
  EntityRepository,
  Repository,
  SelectQueryBuilder,
  EntityManager,
  ObjectType,
  Connection,
} from 'typeorm';
import { checkArrayIsEmptyOrNull } from '../helper';
//  let entity : ObjectType<T>
import { BaseE } from './';

export class RepoBase<T extends BaseE> extends Repository<T> {
  private entity: ObjectType<T>;
  private connection: Connection;
  public include: string[] = [];
  private alias: string = null;

  constructor(entity: ObjectType<T>, alias: string, include?: string[]) {
    super();
    this.entity = entity;
    this.include = include;
    this.alias = alias;
  }
  async getOne(where, transactionEntityManager: EntityManager = null) {
    return !transactionEntityManager
      ? await this.findOne(where)
      : transactionEntityManager.findOne(this.entity, {
          where,
        });
  }

  async getList(relations?: Array<string>): Promise<Array<T>> {
    return checkArrayIsEmptyOrNull(relations)
      ? await this.find({
          relations,
        })
      : await this.find();
  }

  async deleteById(
    id: string | number,
    transactionEntityManager: EntityManager = null,
  ): Promise<void> {
    if (!transactionEntityManager) {
      await this.deleteById(id);
    } else {
      await transactionEntityManager.delete(this.entity, id);
    }
  }
}
