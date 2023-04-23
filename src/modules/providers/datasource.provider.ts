import {DataSource} from 'typeorm'

import * as env from 'dotenv';
import {Class} from '../database/entities/class/class.entity'
import {Section} from '../database/entities/section/section.entity'
import {Module} from '../database/entities/module/module.entity'
import {Video} from '../database/entities/section/video.entity'
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
  entities: [Class, Section, Module, Video],
  subscribers: [],
  migrations: [],
})
