/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：login-user.dto.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginUserDto {
  @ApiProperty({
    description: '用户账号'
  })
  @IsNotEmpty({ message: '用户账号不得为空' })
  @IsString()
  readonly username: string

  @ApiProperty({
    description: '用户密码'
  })
  @IsNotEmpty({ message: '用户密码不得为空' })
  @IsString()
  readonly password: string
}
