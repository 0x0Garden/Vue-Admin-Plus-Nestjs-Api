/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：policies.guard.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Injectable, CanActivate, ExecutionContext, Type, Scope } from '@nestjs/common'
import { ContextIdFactory, ModuleRef, Reflector } from '@nestjs/core'
import { Request } from 'express'

import { CaslAbilityFactory } from '../casl-ability.factory'
import { PolicyHandler } from '../policies/policy-handler.interface'
import { CHECK_POLICIES_KEY } from '../constants'

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private caslAbilityFactory: CaslAbilityFactory,
    private reflector: Reflector,
    private moduleRef: ModuleRef
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const policiesHandlersRef = this.reflector.get<Type<PolicyHandler>[]>(CHECK_POLICIES_KEY, ctx.getHandler()) || []

    if (policiesHandlersRef.length === 0) return true

    const contextId = ContextIdFactory.create()
    this.moduleRef.registerRequestByContextId(ctx.switchToHttp().getRequest(), contextId)

    const policyHandlers: PolicyHandler[] = []
    for (let i = 0; i < policiesHandlersRef.length; i++) {
      const policyHandlerRef = policiesHandlersRef[i]
      const policyScope = this.moduleRef.introspect(policyHandlerRef).scope
      let policyHandler: PolicyHandler
      if (policyScope === Scope.DEFAULT) {
        policyHandler = this.moduleRef.get(policyHandlerRef, { strict: false })
      } else {
        policyHandler = await this.moduleRef.resolve(policyHandlerRef, contextId, { strict: false })
      }
      policyHandlers.push(policyHandler)
    }

    const { user }: any = ctx.switchToHttp().getRequest<Request>()
    if (!user) return false

    const ability = this.caslAbilityFactory.createForUser(user)
    return policyHandlers.every(handler => handler.handle(ability))
  }
}
