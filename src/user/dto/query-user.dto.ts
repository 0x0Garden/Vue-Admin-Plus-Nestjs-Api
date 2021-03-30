/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：query-user.dto.ts
 * 创建日期：2021年03月02日
 * 创建作者：Jaxson
 */
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'

export class QueryUserDto {
  @ApiProperty({
    required: false,
    description: '当前页码'
  })
  @IsNotEmpty({ message: '当前页码不得为空' })
  @Type(() => Number)
  readonly currentPage: number = 1

  @ApiProperty({
    required: false,
    description: '每页条数'
  })
  @IsNotEmpty({ message: '每页条数不得为空' })
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
  @IsNotEmpty({ message: '用户状态不得为空' })
  readonly activeStatus?: number = 3

  @ApiProperty({
    required: false,
    description: '排序方式: ASC, DESC'
  })
  @IsNotEmpty({ message: '排序方式不得为空' })
  readonly order?: 'DESC' | 'ASC' = 'DESC'
}
