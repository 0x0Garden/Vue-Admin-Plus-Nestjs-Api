/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：app.module.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Connection } from 'typeorm'
import { Module, ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common'
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TypeOrmConfigModule } from './config/typeorm.config'
import { AppController } from './app.controller'
import { UserModule } from './user/user.module'
import { CaslModule } from './casl/casl.module'
// import { ArticleModule } from './article/article.module'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfigModule), AuthModule, UserModule, CaslModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidUnknownValues: true
      })
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ]
})
export class AppModule {
  constructor(private connection: Connection) {}
}
