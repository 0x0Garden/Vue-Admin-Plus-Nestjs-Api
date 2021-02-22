/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：user.interface.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Role } from './enums/role.enum'

export interface UserData {
  user: {
    username: string
    email: string
    nickname: string
    role: Role
    isActive: boolean
    createdTime: Date
    updatedTime: Date
  }
  token: string
}
