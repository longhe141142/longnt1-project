import { config } from 'dotenv';
config();
import { resolve } from 'path';

export const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  userName: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  entities: [`${__dirname}/../../entities/*.{js,ts}`],
  type: process.env.DB_TYPE,
  synchronize: process.env.DB_SYNC,
};

console.log(resolve(__dirname+"/../../entities/user.js"));
