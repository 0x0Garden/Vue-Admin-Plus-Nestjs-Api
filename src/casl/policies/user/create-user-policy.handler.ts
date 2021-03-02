/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：create-user-policy.handler.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { PolicyHandler } from '../policy-handler.interface'
import { AppAbility } from '@/casl/casl-ability.factory'
import { Action } from '@/casl/enums/action.enum'
import { UserEntity } from '@/user/entities/user.entity'

export class CreateUserPolicyHandler implements PolicyHandler {
  handle(appAbility: AppAbility): boolean {
    return appAbility.can(Action.CREATE, UserEntity)
  }
}
