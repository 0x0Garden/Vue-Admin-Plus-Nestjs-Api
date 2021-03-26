/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：casl-ability.factory.ts
 * 创建日期：2021年03月26日
 * 创建作者：Jaxson
 */

import { Injectable } from '@nestjs/common'
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability'

import { Action } from '@/casl/enums/action.enum'
import { UserEntity } from '@/user/entities/user.entity'
import { Role } from '@/user/enums/role.enum'

type Subjects = InferSubjects<typeof UserEntity> | 'all'

export type AppAbility = Ability<[Action, Subjects]>

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>)

    if (user.role === Role.Admin) {
      can(Action.MANAGE, 'all')
      can(Action.LIST, 'all')
    }

    can(Action.READ, UserEntity, { id: user.id })
    can(Action.UPDATE, UserEntity, { id: user.id })
    cannot(Action.DELETE, UserEntity, { role: Role.Admin })

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    })
  }
}
