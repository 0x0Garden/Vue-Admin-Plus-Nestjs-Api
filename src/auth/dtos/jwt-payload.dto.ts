/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：jwt-payload.dto.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { UserEntity } from '@/user/entities/user.entity'
import { Role } from '@/user/enums/role.enum'

export class JwtPayload {
  username: string
  role: Role
  sub: string
}

export interface FullJwtPayload extends JwtPayload {
  iat: number // 签发时间
  exp: number // 过期时间
}

export interface UserEntityHasToken extends UserEntity {
  token?: string
}
