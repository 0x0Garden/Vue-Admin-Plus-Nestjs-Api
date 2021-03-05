/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：main.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */
import { NestFactory, Reflector } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { BadRequestFilter, QueryFailedFilter } from '@/filters'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true
  })
  const reflector = app.get(Reflector)

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new BadRequestFilter(reflector), new QueryFailedFilter(reflector))
  app.enableCors() // 启用允许跨域

  const config = new DocumentBuilder()
    .setTitle('Vue Admin Plus 管理系统接口文档')
    .setDescription('这是一份关于 Vue Admin Plus 管理系统的接口文档')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3000)
}
bootstrap().then()
