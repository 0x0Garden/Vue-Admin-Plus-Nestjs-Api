/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：article.service.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateArticleDto } from './dto'
import { ArticleEntity } from './article.entity'
import { UserEntity } from '@/user/user.entity'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>
  ) {}

  /**
   * 创建文章
   * @param createArticleDto
   * @return ArticleEntity
   */
  create(createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    const article = new ArticleEntity()
    article.title = createArticleDto.title
    article.content = createArticleDto.content

    return this.articleRepository.save(article)
  }

  /**
   * 查找全部文章
   * @return ArticleEntity[]
   */
  findAll(): Promise<ArticleEntity[]> {
    return this.articleRepository.find()
  }

  /**
   * 根据文章编码查询
   * @param id
   */
  findById(id: string): Promise<ArticleEntity> {
    return this.articleRepository.findOne(id)
  }

  /**
   * 根据文章编码删除
   * @param id
   */
  async remove(id: string): Promise<void> {
    await this.articleRepository.delete(id)
  }
}
