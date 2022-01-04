import {
  Injectable,
  BadRequestException,
  HttpStatus,
  HttpException,
  forwardRef,
  Inject,
  Catch,
  BadGatewayException,
} from '@nestjs/common';
import { ObjectType, Repository } from 'typeorm';
import { BaseE, RepoBase } from './';

@Injectable()
export class BaseService<T extends BaseE> {
  constructor(private readonly genericRepository:RepoBase<T>) {}

  async getAll(): Promise<T[]> {
    try {
      return await (<Promise<T[]>>this.genericRepository.getList());
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async get(where: Object = {}): Promise<T> {
    try {
      return await (<Promise<T>>this.genericRepository.getOne(where));
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async deleteById(id: string | number):Promise<void> {
    try {
      this.genericRepository.deleteById(id);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}