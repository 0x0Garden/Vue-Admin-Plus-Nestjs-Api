/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：policy-handler.interface.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { AppAbility } from '../casl-ability.factory'

export interface PolicyHandler {
  handle(appAbility: AppAbility): boolean
}
