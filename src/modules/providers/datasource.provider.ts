import {DataSource} from 'typeorm'
import {Class} from '../entities/class.entity'
import {ClassPart} from '../entities/class-part.entity'
import {Module} from '../entities/module.entity'

import * as env from 'dotenv';
import {Video} from '../entities/video.entity'
env.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Class, ClassPart, Module, Video],
  subscribers: [],
  migrations: [],
})
