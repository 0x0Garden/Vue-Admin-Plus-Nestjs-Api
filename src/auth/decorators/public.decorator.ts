/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：public.decorator.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = (isPublic = true) => SetMetadata(IS_PUBLIC_KEY, isPublic)
