/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：check-policies.decorator.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { SetMetadata, Type } from '@nestjs/common'

import { PolicyHandler } from '../policies/policy-handler.interface'
import { CHECK_POLICIES_KEY } from '../constants'

export const CheckPolicies = (...handlers: Type<PolicyHandler>[]) => SetMetadata(CHECK_POLICIES_KEY, handlers)
