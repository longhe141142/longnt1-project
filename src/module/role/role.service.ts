import { Injectable } from '@nestjs/common';
import { async } from 'rxjs';
import { RoleRopsitory } from './role.repository';

@Injectable()
export class RoleService {

  constructor(private readonly roleRepo: RoleRopsitory) {}

  getApis = async ()=>{
     return await this.roleRepo.getApi();
  }

  
}
