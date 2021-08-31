/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：jwt.strategy.ts
 * 创建日期：2021年08月31日
 * 创建作者：Jaxson
 */

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

import { AuthService } from '../auth.service'
import { UserEntity } from '@/user/entities/user.entity'
import { FullJwtPayload } from '../dtos'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret')
    })
  }

  async validate(fullJwtPayload: FullJwtPayload): Promise<UserEntity> {
    const user = await this.authService.retrieveUserFromJwt(fullJwtPayload)
    // 如果有用户信息，代表 token 没有过期，没有则 token 已失效
    if (!user) throw new UnauthorizedException()
    return user
  }
}
