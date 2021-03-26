/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：auth.guard.ts
 * 创建日期：2021年03月26日
 * 创建作者：Jaxson
 */
import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'

export const Auth = () =>
  applyDecorators(UseGuards(AuthGuard('jwt')), ApiBearerAuth, ApiUnauthorizedResponse({ description: 'Unauthorized' }))
