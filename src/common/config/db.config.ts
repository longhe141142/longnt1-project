import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './index';
import { join ,resolve} from 'path';
export const typeOrmConfig: TypeOrmModule = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.userName,
  password: dbConfig.password,
  database: dbConfig.dbName,
  logging: true,
  entities: dbConfig.entities,
  synchronize: false,
  // subscribers: [`${__dirname}/../../module/**/*.{js,ts}`],
};

console.log(join(__dirname,`/../../module/**/*.{js,ts}`));
