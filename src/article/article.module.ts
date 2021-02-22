/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：article.module.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Module } from '@nestjs/common'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'

@Module({
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
