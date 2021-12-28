import { Controller, Get ,Render} from '@nestjs/common';
import { AppService } from './app.service';
const logger = require("../src/common/untils/logger") 
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('home')
  @Render('login.hbs')
  getHello() {
    return { message: 'Hello world!' };
  }



  @Get('test-layout')
  @Render('index.hbs')
  getLayout() {
    logger.warn("Service have not been initialized!");

    // return { header: 'monster-admin/monster-html/common/partials/header.hbs' };
  }
}
