/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：typeorm.config.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

export const TypeOrmConfigModule = (configService: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: configService.get<string>('database.host'),
    port: configService.get<number>('database.port'),
    username: configService.get<string>('database.username'),
    password: configService.get<string>('database.password'),
    database: configService.get<string>('database.database'),
    entityPrefix: configService.get<string>('database.prefix'),
    entities: configService.get('nodeEnv') === 'test' ? ['src/**/*.entity{.ts,.js}'] : ['dist/**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV === 'development'
  }
}
