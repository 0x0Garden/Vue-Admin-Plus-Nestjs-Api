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
import { UserEntity } from '@/user/user.entity'
import { LoginUserDto } from '@/user/dto'
import { JwtPayload } from '@/auth/dtos'
import { UserData } from '@/user/user.interface'

class ValidateUser {
  statusCode: number
  user: UserEntity | null
}

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}
  /**
   * 验证用户
   * @param username
   * @param password
   */
  async validateUser({ username, password }: LoginUserDto): Promise<ValidateUser> {
    const user = await this.userService.findByUsername(username)
    return user && user.password === password
      ? {
        statusCode: 200,
          user
        }
      : {
        statusCode: 400,
          user: null
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
  async retrieveUserFromJwt(jwtPayload: JwtPayload): Promise<UserEntity | null> {
    const user: UserEntity = await this.userService.findById(jwtPayload.sub)
    if (user && user.username === jwtPayload.username) {
      return user
    }
    return null
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
