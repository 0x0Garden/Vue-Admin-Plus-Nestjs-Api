/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：login-user.dto.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class LoginUserDto {
  @ApiProperty({
    type: String,
    description: '用户账号'
  })
  @IsNotEmpty()
  readonly username: string

  @ApiProperty({
    type: String,
    description: '用户密码'
  })
  @IsNotEmpty()
  readonly password: string
}
