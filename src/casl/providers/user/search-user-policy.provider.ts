/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：search-user-policy.provider.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Provider } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'

import { SearchUserPolicyHandler } from '../../policies/user/search-user-policy.handler'

export const SearchUserPolicyProvider: Provider = {
  provide: SearchUserPolicyHandler,
  inject: [REQUEST],
  useFactory: (request: Request) => {
    return new SearchUserPolicyHandler(request.params.username)
  }
}
