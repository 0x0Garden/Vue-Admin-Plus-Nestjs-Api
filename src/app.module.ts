/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：app.module.ts
 * 创建日期：2021年03月27日
 * 创建作者：Jaxson
 */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

import configuration from '@/config/configuration'
import { TypeOrmConfigModule } from '@/config/typeorm.config'
import { AppController } from '@/app.controller'
import { UserModule } from '@/user/user.module'
import { CaslModule } from '@/casl/casl.module'
import { AuthModule } from '@/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => TypeOrmConfigModule(configService),
      inject: [ConfigService]
    }),
    AuthModule,
    UserModule,
    CaslModule
  ],
  controllers: [AppController]
})
export class AppModule {}
