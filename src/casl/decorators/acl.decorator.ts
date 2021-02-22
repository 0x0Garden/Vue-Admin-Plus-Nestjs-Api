/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：acl.decorator.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { CanActivate, UseGuards, Type } from '@nestjs/common'

import { PoliciesGuard } from '../guards/policies.guard'

export function Acl(authGuard: Type<CanActivate>) {
  return UseGuards(authGuard, PoliciesGuard)
}
