/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：user.controller.ts
 * 创建日期：2021年03月31日
 * 创建作者：Jaxson
 */

import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, ForbiddenException } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger'

import { UserService } from './user.service'
import { UserEntity } from '@/user/entities/user.entity'
import { CreateUserDto, QueryUserDto, RemoveUserDto, UpdateUserDto } from './dto'
import { User } from '@/user/decorators'
import { PaginationRO } from '@/utils/response.result'
import { Action } from '@/casl/enums/action.enum'
import { CheckPolicies, PoliciesGuard } from '@/casl/guards/policies.guard'
import { CaslAbilityFactory } from '@/casl/casl-ability.factory'
import { AppAbility } from '@/casl/casl-ability.factory'

@ApiTags('用户管理')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly caslAbilityFactory: CaslAbilityFactory) {}

  @ApiOperation({ summary: '用户创建' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(createUserDto)
  }

  @ApiOperation({ summary: '查询所有用户信息列表' })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.List, UserEntity))
  @Get()
  async findAll(@Query() queryUserDto: QueryUserDto): Promise<PaginationRO> {
    return await this.userService.filterAndPageQuery(queryUserDto)
  }

  @ApiOperation({ summary: '获取当前登录用户帐号信息' })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, UserEntity))
  @Get('getInfo')
  async getInfo(@User() user: UserEntity): Promise<UserEntity> {
    return user
  }

  @ApiOperation({ summary: '根据用户编号查询用户信息' })
  @Get(':id')
  async findOne(@User() user: UserEntity, @Param('id') id: string): Promise<UserEntity> {
    const foundUser = await this.userService.findById(id)
    const ability = this.caslAbilityFactory.createForUser(user)

    if (ability.can(Action.Read, foundUser)) {
      return foundUser
    } else {
      throw new ForbiddenException()
    }
  }

  @ApiOperation({ summary: '用户全量更新' })
  @ApiBody({ type: UpdateUserDto })
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log(id)
    console.log(updateUserDto)
  }

  @ApiOperation({ summary: '根据多个用户编号删除用户' })
  @ApiBody({ type: RemoveUserDto })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, UserEntity))
  @Delete('list')
  async removeList(@Body() removeUserDto: RemoveUserDto): Promise<void> {
    return await this.userService.removeList(removeUserDto)
  }

  @ApiOperation({ summary: '根据用户编号删除用户' })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, UserEntity))
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.userService.remove(id)
  }
}
