/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：route.controller.ts
 * 创建日期：2021年03月02日
 * 创建作者：Jaxson
 */

import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routeService.create(createRouteDto);
  }

  @Get()
  findAll() {
    return this.routeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routeService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routeService.remove(+id);
  }
}
