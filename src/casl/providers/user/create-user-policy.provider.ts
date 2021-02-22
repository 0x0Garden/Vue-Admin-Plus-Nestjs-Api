/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：create-user-policy.provider.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Provider } from '@nestjs/common'

import { CreateUserPolicyHandler } from '../../policies/user/create-user-policy.handler'

export const CreateUserPolicyProvider: Provider = CreateUserPolicyHandler
