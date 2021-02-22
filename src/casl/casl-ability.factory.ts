/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：casl-ability.factory.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Injectable } from '@nestjs/common'
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability'

import { Action } from './enums/action.enum'
import { UserEntity } from '@/user/user.entity'
import { Role } from '@/user/enums/role.enum'

type Subjects = InferSubjects<typeof UserEntity | UserEntity> | 'all'

export type AppAbility = Ability<[Action, Subjects]>

@Injectable()
export class CaslAbilityFactory {
  // todo createForUser(user: UserEntity)
  createForUser(user: any) {
    const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>)

    if (user.role === Role.Admin) {
      can(Action.MANAGE, 'all')
    } else {
      // can(Action.READ, Post)
      // can(Action.UPDATE, User, { id: user.id })
      // can(Action.READ, User, { id: user.id })
      // can(Action.READ, User, { login: user.login })
      // can(Action.CREATE, Post)
      // cannot(Action.DELETE, Post)
      //
      // can<FlatAttachedFile>(Action.DELETE, AttachedFile, {
      //   'post.author.id': user.id
      // })
    }

    // can<FlatPost>(Action.UPDATE, Post, { 'author.id': user.id })

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    })
  }
}
