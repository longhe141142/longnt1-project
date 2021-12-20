import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './index';

export const typeOrmConfig: TypeOrmModule = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.userName,
  password: dbConfig.password,
  database: dbConfig.dbName,
  logging: true,
  entities: dbConfig.entities,
  synchronize: dbConfig.synchronize,
};
