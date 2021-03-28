/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：create-user.dto.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    description: '用户账号'
  })
  @IsNotEmpty({ message: '用户账号不得为空' })
  readonly username: string

  @ApiProperty({
    description: '用户密码'
  })
  @IsNotEmpty({ message: '用户密码不得为空' })
  readonly password: string

  @ApiProperty({
    description: '用户邮箱'
  })
  @IsNotEmpty({ message: '用户邮箱不得为空' })
  @IsEmail({ allow_display_name: true }, { message: '用户邮箱格式不规范' })
  readonly email: string

  @ApiProperty({
    description: '用户昵称'
  })
  @IsNotEmpty({ message: '用户昵称不得为空' })
  readonly nickname: string
}
