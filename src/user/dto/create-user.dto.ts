/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：create-user.dto.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string

  @IsNotEmpty()
  readonly password: string

  @IsNotEmpty()
  readonly email: string

  @IsNotEmpty()
  readonly nickname: string
}
