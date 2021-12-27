import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UserService } from '../user/user.service';

function testMethod(
  target: Object,
  propertyName: string,
  propertyDesciptor: PropertyDescriptor,
) {
  const method = propertyDesciptor.value;
}

async function CheckUserExist() {}

const SampleClass = {
  property1() {
    console.log('hehe');
  },
};

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly userService: UserService,
  ) {}

  @testMethod
  testMeTHod() {}

  @Post('v1/create')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post('v1/create-admin')
  createAdmninV1(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmninV1();
  }

  // @Get('test-decorator')
  // test() {
  //   this.userService.checkUserExist();
  //   const val = Object.getOwnPropertyDescriptor(SampleClass, 'property1').value;
  //   this.logger.info(val);
  // }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
