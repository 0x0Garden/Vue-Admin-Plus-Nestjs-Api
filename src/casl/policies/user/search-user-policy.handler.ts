/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：search-user-policy.handler.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { PolicyHandler } from '../policy-handler.interface'
import { AppAbility } from '@/casl/casl-ability.factory'
import { UserEntity } from '@/user/user.entity'
import { Action } from '@/casl/enums/action.enum'

export class SearchUserPolicyHandler implements PolicyHandler {
  constructor(private usernameToSearch: string) {}

  handle(appAbility: AppAbility): boolean {
    if (!this.usernameToSearch) return false
    const mockUserToSearch: UserEntity = new UserEntity()
    mockUserToSearch.username = this.usernameToSearch
    return appAbility.can(Action.READ, mockUserToSearch)
  }
}
