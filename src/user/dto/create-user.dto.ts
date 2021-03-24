/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：create-user.dto.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    description: '用户账号'
  })
  @IsNotEmpty()
  readonly username: string

  @ApiProperty({
    description: '用户密码'
  })
  @IsNotEmpty()
  readonly password: string

  @ApiProperty({
    description: '用户邮箱'
  })
  @IsNotEmpty()
  readonly email: string

  @ApiProperty({
    description: '用户昵称'
  })
  @IsNotEmpty()
  readonly nickname: string
}
