/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：app.module.ts
 * 创建日期：2021年03月27日
 * 创建作者：Jaxson
 */
import { join } from 'path'
import { Module, ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { APP_GUARD, APP_PIPE, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'

import configuration from '@/config/configuration'
import { TypeOrmConfigModule } from '@/config/typeorm.config'
import { AppController } from '@/app.controller'
import { UserModule } from '@/user/user.module'
import { CaslModule } from '@/casl/casl.module'
import { AuthModule } from '@/auth/auth.module'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { TransformInterceptor } from '@/shared/interceptor/transform.interceptor'
import { HttpExceptionFilter } from '@/shared/filters/http-exception.filter'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*']
    }),
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
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true
      })
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ]
})
export class AppModule {}
