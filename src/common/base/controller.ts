import { User } from './../../entities/user';
import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { BaseE, BaseService } from './';

export class BaseController<T extends BaseE> {
  constructor(private readonly baseService: BaseService<T>) {}

  @Get('list')
  async getAll(): Promise<T[]> {
    return await this.baseService.getAll();
  }

  @Get('search')
  async getOne(): Promise<T> {
    return await this.baseService.get();
  }

 
}
