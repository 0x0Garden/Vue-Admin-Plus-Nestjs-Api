/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：policies.guard.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { AppAbility, CaslAbilityFactory } from '../casl-ability.factory'

interface IPolicyHandler {
  handle(ability: AppAbility): boolean
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback

export const CHECK_POLICIES_KEY = '__check_policy__'

export const CheckPolicies = (...handlers: PolicyHandler[]) => SetMetadata(CHECK_POLICIES_KEY, handlers)

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private caslAbilityFactory: CaslAbilityFactory, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || []

    const user = context.switchToHttp().getRequest()?.user
    const ability = this.caslAbilityFactory.createForUser(user)

    return policyHandlers.every(handler => {
      return PoliciesGuard.execPolicyHandler(handler, ability)
    })
  }

  private static execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability)
    }

    return handler.handle(ability)
  }
}
