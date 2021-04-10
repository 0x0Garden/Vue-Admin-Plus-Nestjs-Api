/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：main.ts
 * 创建日期：2021年03月27日
 * 创建作者：Jaxson
 */
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'

import { AppModule } from '@/app.module'
import { LoggerService } from '@/logger/logger.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // 获取全局配置
  const configService = app.get<ConfigService>(ConfigService)

  const logsDir = configService.get<string>('logsDir')
  const logger = new LoggerService(logsDir)
  app.useLogger(logger)

  app.setGlobalPrefix('api')
  app.enableCors() // 启用允许跨域

  const config = new DocumentBuilder()
    .setTitle('Vue Admin Plus 管理系统接口文档')
    .setDescription('这是一份关于 Vue Admin Plus 管理系统的接口文档')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(configService.get<number>('port'))

  logger.log(`设置应用程序端口号：${configService.get<number>('port')}`, 'bootstrap')
  logger.log(`应用程序接口地址： http://localhost:${configService.get<number>('port')}/api`, 'bootstrap')
  logger.log(`应用程序文档地址： http://localhost:${configService.get<number>('port')}/docs`, 'bootstrap')
  logger.log('🚀 服务应用已经成功启动！', 'bootstrap')
}

bootstrap()
