/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：local.strategy.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password'
    })
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ username, password })
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
