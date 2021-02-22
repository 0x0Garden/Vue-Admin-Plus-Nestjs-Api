/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：login.module.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Module } from '@nestjs/common'

import { LoginController } from './login.controller'
import { AuthModule } from '@/auth/auth.module'

@Module({
  imports: [AuthModule],
  controllers: [LoginController]
})
export class LoginModule {}
