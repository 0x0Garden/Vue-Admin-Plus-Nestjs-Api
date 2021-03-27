/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：user.decorator.ts
 * 创建日期：2021年03月26日
 * 创建作者：Jaxson
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { UserEntity } from '@/user/entities/user.entity'

export const User = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()
  const user: UserEntity = request.user
  return user
})
