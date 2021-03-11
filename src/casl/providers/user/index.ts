/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：index.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Provider } from '@nestjs/common'

import { CreateUserPolicyProvider } from './create-user-policy.provider'
import { SearchUserPolicyProvider } from './search-user-policy.provider'
import { RemoveUserPolicyProvider } from './remove-user-policy.provider'

export const userPolicyProviders: Provider[] = [
  CreateUserPolicyProvider,
  SearchUserPolicyProvider,
  RemoveUserPolicyProvider
]
