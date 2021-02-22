/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：article.controller.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common'

import { ArticleService } from './article.service'
import { ArticleEntity } from './article.entity'
import { CreateArticleDto } from './dto'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    return this.articleService.create(createArticleDto)
  }

  @Get()
  findAll(): Promise<ArticleEntity[]> {
    return this.articleService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ArticleEntity> {
    return this.articleService.findById(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.articleService.remove(id)
  }
}
