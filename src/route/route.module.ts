/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：route.module.ts
 * 创建日期：2021年03月02日
 * 创建作者：Jaxson
 */

import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';

@Module({
  controllers: [RouteController],
  providers: [RouteService]
})
export class RouteModule {}
