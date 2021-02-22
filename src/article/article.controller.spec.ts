/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：article.controller.spec.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Test, TestingModule } from '@nestjs/testing'
import { ArticleController } from './article.controller'

describe('ArticleController', () => {
  let controller: ArticleController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController]
    }).compile()

    controller = module.get<ArticleController>(ArticleController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
