/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：update-user.dto.ts
 * 创建日期：2021年03月30日
 * 创建作者：Jaxson
 */

import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsBoolean } from 'class-validator'
import { Type } from 'class-transformer'

import { Role } from '@/user/enums/role.enum'

export class UpdateUserDto {
  @ApiProperty({
    description: '用户邮箱'
  })
  @IsNotEmpty({ message: '用户邮箱不得为空' })
  @IsEmail({ allow_display_name: true }, { message: '用户邮箱格式不规范' })
  readonly email?: string

  @ApiProperty({
    description: '用户昵称'
  })
  @IsNotEmpty({ message: '用户昵称不得为空' })
  readonly nickname?: string

  @ApiProperty({
    description: '用户角色身份'
  })
  @IsNotEmpty({ message: '用户角色身份不得为空' })
  readonly role?: Role

  @ApiProperty({
    description: '用户状态'
  })
  @IsNotEmpty({ message: '用户状态不得为空' })
  @IsBoolean({ message: '用户状态类型为布尔值' })
  @Type(() => Boolean)
  readonly isActive?: boolean = true
}
