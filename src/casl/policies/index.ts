/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：index.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Type } from '@nestjs/common'

import { PolicyHandler } from './policy-handler.interface'

import { userPolicies } from './user'

export * from './user'

export const policies: Type<PolicyHandler>[] = [...userPolicies]
