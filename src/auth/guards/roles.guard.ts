/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：roles.guard.ts
 * 创建日期：2021年08月31日
 * 创建作者：Jaxson
 */

import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user
    // 当前请求需要权限
    const currentPermissions = this.reflector.get<string>('permissions', context.getHandler())
    Logger.log(request, '权限：', currentPermissions)
    // if (!currentPermissions) return true
    return true
  }
}
