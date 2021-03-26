/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：casl.module.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Module, Global } from '@nestjs/common'

import { CaslAbilityFactory } from '@/casl/casl-ability.factory'

@Global()
@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class CaslModule {}
