/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：query-user.dto.ts
 * 创建日期：2021年03月02日
 * 创建作者：Jaxson
 */
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class QueryUserDto {
  @ApiProperty({
    required: false,
    description: '页码'
  })
  @Type(() => Number)
  readonly currentPage: number = 1

  @ApiProperty({
    required: false,
    description: '条数'
  })
  @Type(() => Number)
  readonly pageSize: number = 10

  @ApiProperty({
    required: false,
    description: '用户账号'
  })
  readonly username?: string

  @ApiProperty({
    required: false,
    description: '用户状态'
  })
  @Type(() => Number)
  readonly activeStatus: number = 3

  @ApiProperty({
    required: false,
    description: '排序的方式: ASC, DESC'
  })
  readonly order: 'DESC' | 'ASC' = 'DESC'
}
