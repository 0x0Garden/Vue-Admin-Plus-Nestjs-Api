/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：user.decorator.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { UserEntity } from '@/user/entities/user.entity'

export const ReqUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest()
  const user: UserEntity = req.user
  return user as UserEntity
})
