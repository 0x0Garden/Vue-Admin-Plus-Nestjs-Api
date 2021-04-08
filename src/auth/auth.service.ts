/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：auth.service.ts
 * 创建日期：2021年03月26日
 * 创建作者：Jaxson
 */

import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { getRepository } from 'typeorm'

import { UserService } from '@/user/user.service'
import { BcryptService } from '@/shared/services/bcrypt.service'
import { UserEntity } from '@/user/entities/user.entity'
import { LoginUserDto } from '@/user/dto'
import { JwtPayload, FullJwtPayload, UserEntityHasToken } from '@/auth/dtos'
import { UserData } from '@/user/user.interface'

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
  async validateUser({ username, password }: LoginUserDto): Promise<UserEntity> {
    const user = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect('user.password')
      .getOne()
    if (!user) throw new BadRequestException('找不到用户')
    if (!user.isActive) throw new BadRequestException('该用户处于禁封状态，请联系管理员！')
    const isEqualPwd = await this.bcryptService.compare(password, user.password)
    if (!isEqualPwd) throw new BadRequestException('用户密码错误')
    return user
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
    const data: UserEntityHasToken = user
    if (user && user.username === jwtPayload.username) {
      // 从 jwtPayload 获取生成 jwt token 生成的时间戳
      // 如果在快过期的五分钟时间段内，则生成新的 jwt token
      const limitTimeMap = 60 * 5
      if (jwtPayload.exp - Math.round(new Date().valueOf() / 1000) <= limitTimeMap) {
        console.log('开始生成新的 token')
        data.token = await this.certificate(user)
      }
    } else {
      throw new UnauthorizedException()
    }
    return data
  }
  /**
   * 返回用户账号信息
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
