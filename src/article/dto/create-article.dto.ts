/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：create-article.dto.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { IsNotEmpty, IsString } from 'class-validator'

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string

  @IsString()
  readonly content: string
}
