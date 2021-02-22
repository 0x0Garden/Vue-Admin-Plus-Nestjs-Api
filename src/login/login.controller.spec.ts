/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：login.controller.spec.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Test, TestingModule } from '@nestjs/testing'
import { LoginController } from './login.controller'

describe('LoginController', () => {
  let controller: LoginController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController]
    }).compile()

    controller = module.get<LoginController>(LoginController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
