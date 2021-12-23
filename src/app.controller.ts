import { Controller, Get ,Render} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('home')
  @Render('index.hbs')
  getHello() {
    return { message: 'Hello world!' };
  }

  @Get('test-layout')
  @Render('monster-admin/monster-html/index.hbs')
  getLayout() {
    // return { header: 'monster-admin/monster-html/common/partials/header.hbs' };
  }
}
