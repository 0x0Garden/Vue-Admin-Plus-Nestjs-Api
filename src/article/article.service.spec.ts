/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：article.service.spec.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Test, TestingModule } from '@nestjs/testing'
import { ArticleService } from './article.service'

describe('ArticleService', () => {
  let service: ArticleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleService]
    }).compile()

    service = module.get<ArticleService>(ArticleService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
