import { HttpStatus } from '@nestjs/common';
import {ResponseMessage} from '../constants/common.constants'

export class ResponseReport {
    code: number;
    message: string;
    data: any;
  
    constructor(fields?: Partial<ResponseReport>) {
      if (fields) {
        Object.assign(this, fields);
      }
    }
  }

  export class ResponseSuccess extends ResponseReport{
      code = HttpStatus.OK;
      message = ResponseMessage.SUCCESS_0;
      data:any
  }

  