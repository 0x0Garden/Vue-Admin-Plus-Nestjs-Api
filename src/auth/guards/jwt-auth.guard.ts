/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：jwt-auth.guard.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

import { IS_PUBLIC_KEY } from '@/auth/decorators'
import { UserEntity } from '@/user/entities/user.entity'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])
    return isPublic ? true : super.canActivate(context)
  }
  handleRequest(err: any, user: UserEntity, info: Error): any {
    if (info) {
      if (info.name === 'TokenExpiredError') {
        throw new HttpException('TokenExpired', HttpStatus.UNAUTHORIZED)
      } else {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
      }
    }
    return user
  }
}
