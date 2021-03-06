/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：auth.service.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserService } from '@/user/user.service'
import { BcryptService } from '@/shared/services/bcrypt.service'
import { UserEntity } from '@/user/entities/user.entity'
import { LoginUserDto } from '@/user/dto'
import { JwtPayload, FullJwtPayload, UserEntityHasToken } from '@/auth/dtos'
import { UserData } from '@/user/user.interface'
import { StatusCode } from '@/utils/enum/code.enum'
import { ServiceRO } from '@/utils/response.result'

interface ValidateUser extends ServiceRO {
  data: UserEntity | null
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService
  ) {}
  /**
   * 验证用户
   * @param username
   * @param password
   */
  async validateUser({ username, password }: LoginUserDto): Promise<ValidateUser> {
    const user = await this.userService.findByUsername(username)
    const isEqualPwd = await this.bcryptService.compare(password, user.password)
    return user && isEqualPwd
      ? {
          code: StatusCode.SUCCESS,
          data: user
        }
      : {
          code: StatusCode.BUSINESS_FAIL,
          data: null
        }
  }
  /**
   * 向用户颁发 JWT
   * @param user
   */
  async certificate(user: UserEntity) {
    const payload: JwtPayload = {
      username: user.username,
      role: user.role,
      sub: user.id
    }
    return this.jwtService.sign(payload)
  }
  /**
   * 从 JWT 检索用户信息
   * @param jwtPayload
   */
  async retrieveUserFromJwt(jwtPayload: FullJwtPayload): Promise<UserEntityHasToken | null> {
    const user: UserEntity = await this.userService.findById(jwtPayload.sub)
    let data: UserEntityHasToken = user
    if (user && user.username === jwtPayload.username) {
      // 从 jwtPayload 获取生成 jwt token 生成的时间戳
      // 如果在快过期的五分钟时间段内，则生成新的 jwt token
      const limitTimeMap = 60 * 5
      if (jwtPayload.exp - Math.round(new Date().valueOf() / 1000) <= limitTimeMap) {
        data.token = await this.certificate(user)
      }
    } else {
      data = null
    }
    return data
  }
  /**
   * 返回用户登录信息
   * @param user
   * @param token
   */
  async loginUserData(user: UserEntity, token: string): Promise<UserData> {
    return {
      user: {
        username: user.username,
        email: user.email,
        nickname: user.nickname,
        role: user.role,
        isActive: user.isActive,
        createdTime: user.createdTime,
        updatedTime: user.updatedTime
      },
      token
    }
  }
}
