/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：permissions.decorator.ts
 * 创建日期：2021年08月31日
 * 创建作者：Jaxson
 */

import { SetMetadata, applyDecorators } from '@nestjs/common'

export const IS_PERMISSIONS_KEY = 'permissions'

export const Permissions = (str: string) => {
  // 可以定义多个装饰器
  return applyDecorators(SetMetadata(IS_PERMISSIONS_KEY, str))
}
