/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：remove-user.dto.ts
 * 创建日期：2021年03月31日
 * 创建作者：Jaxson
 */
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class RemoveUserDto {
  @ApiProperty({
    description: '用户编号列表'
  })
  @IsNotEmpty({ message: '用户编号列表不得为空' })
  readonly list: string[]
}
