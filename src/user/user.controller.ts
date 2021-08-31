/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：user.controller.ts
 * 创建日期：2021年08月31日
 * 创建作者：Jaxson
 */

import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'

import { UserService } from './user.service'
import { UserEntity } from '@/user/entities/user.entity'
import { CreateUserDto, QueryUserDto, RemoveUserDto, UpdateUserDto } from './dto'
import { User } from '@/user/decorators'
import { PaginationRO } from '@/utils/response.result'

@ApiTags('用户管理')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '用户创建' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(createUserDto)
  }

  @ApiOperation({ summary: '查询所有用户信息列表' })
  @Get()
  async findAll(@Query() queryUserDto: QueryUserDto): Promise<PaginationRO> {
    return await this.userService.filterAndPageQuery(queryUserDto)
  }

  @ApiOperation({ summary: '获取当前登录用户帐号信息' })
  @Get('getInfo')
  async getInfo(@User() user: UserEntity): Promise<UserEntity> {
    return user
  }

  @ApiOperation({ summary: '根据用户编号查询用户信息' })
  @Get(':id')
  async findOne(@User() user: UserEntity, @Param('id') id: string): Promise<UserEntity> {
    return await this.userService.findById(id)
  }

  @ApiOperation({ summary: '用户全量更新' })
  @ApiBody({ type: UpdateUserDto })
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @Put(':id')
  async putUpdateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateById(id, updateUserDto)
  }

  @ApiOperation({ summary: '用户局部更新' })
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @Patch(':id')
  async patchUpdateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateById(id, updateUserDto)
  }

  @ApiOperation({ summary: '根据多个用户编号删除用户' })
  @ApiBody({ type: RemoveUserDto })
  @Delete('list')
  async removeList(@Body() removeUserDto: RemoveUserDto): Promise<void> {
    return await this.userService.removeList(removeUserDto)
  }

  @ApiOperation({ summary: '根据用户编号删除用户' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.userService.remove(id)
  }
}
