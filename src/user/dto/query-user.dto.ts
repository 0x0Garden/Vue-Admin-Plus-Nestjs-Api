/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：query-user.dto.ts
 * 创建日期：2021年03月02日
 * 创建作者：Jaxson
 */
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ValidateIf, IsInt } from 'class-validator'

export class QueryUserDto {
  @ApiProperty({
    type: String,
    description: '用户账号'
  })
  readonly username?: string

  @ApiProperty({
    type: Number,
    description: '页码',
  })
  @Type(() => Number)
  @ValidateIf(o => o.pageNum)
  @IsInt()
  readonly currentPage?: number

  @ApiProperty({
    type: Number,
    description: '条数',
  })
  @Type(() => Number)
  @ValidateIf(o => o.pageNum)
  @IsInt()
  readonly pageSize?: number

  @ApiProperty({
    type: String,
    description: '排序的方式: ASC, DESC',
  })
  @ValidateIf(o => o.sortKey)
  readonly order?: 'DESC' | 'ASC'
}
