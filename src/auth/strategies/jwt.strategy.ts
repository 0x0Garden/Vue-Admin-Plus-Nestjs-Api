/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：jwt.strategy.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

import { AuthService } from '../auth.service'
import { UserEntity } from '@/user/user.entity'
import { JwtPayload } from '../dtos'
import { jwtConstants } from '../constants'

interface FullJwtPayload extends JwtPayload {
  iat: number
  exp: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    })
  }

  async validate(fullJwtPayload: FullJwtPayload): Promise<UserEntity> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exp, iat, ...payload } = fullJwtPayload
    const user = await this.authService.retrieveUserFromJwt(payload)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
