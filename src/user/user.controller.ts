/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：user.controller.ts
 * 创建日期：2021年03月26日
 * 创建作者：Jaxson
 */

import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards, ForbiddenException } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { UserService } from './user.service'
import { UserEntity } from '@/user/entities/user.entity'
import { CreateUserDto, QueryUserDto, RemoveUserDto } from './dto'
import { User } from '@/user/decorators'
import { Auth } from '@/auth/guards/auth.guard'
import { ResponseGenerator, ResponseResult } from '@/utils/response.result'
import { StatusCode } from '@/utils/enum/code.enum'
import { Action } from '@/casl/enums/action.enum'
import { CheckPolicies, PoliciesGuard } from '@/casl/guards/policies.guard'
import { CaslAbilityFactory } from '@/casl/casl-ability.factory'
import { AppAbility } from '@/casl/casl-ability.factory'

@Auth()
@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly caslAbilityFactory: CaslAbilityFactory) {}

  @ApiOperation({ summary: '用户创建' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseGenerator> {
    const userResult = await this.userService.create(createUserDto)
    let data: ResponseGenerator
    switch (userResult.code) {
      case 200:
        data = ResponseResult.success('success', '创建成功')
        break
      case 400:
        data = ResponseResult.fail(StatusCode.BUSINESS_FAIL, '创建失败，登录账号或者邮箱已重复！')
        break
      default:
        data = ResponseResult.fail(StatusCode.TIMEOUT, '未知错误')
    }
    return data
  }

  @ApiOperation({ summary: '查询所有用户信息列表' })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.List, UserEntity))
  @Get()
  async findAll(@Query() queryUserDto: QueryUserDto, @User() user): Promise<ResponseGenerator> {
    const data = await this.userService.filterAndPageQuery(queryUserDto)
    return ResponseResult.success(data, '获取成功', user)
  }

  @ApiOperation({ summary: '获取当前登录用户信息' })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, UserEntity))
  @Get('getInfo')
  async getInfo(@User() user: UserEntity): Promise<ResponseGenerator> {
    return ResponseResult.success(user, '查询成功')
  }

  @ApiOperation({ summary: '根据用户编号查询用户信息' })
  @Get(':id')
  async findOne(@User() user: UserEntity, @Param('id') id: string): Promise<ResponseGenerator> {
    const foundUser = await this.userService.findById(id)
    const ability = this.caslAbilityFactory.createForUser(user)

    if (ability.can(Action.Read, foundUser)) {
      return ResponseResult.success(foundUser, '查询成功')
    } else {
      throw new ForbiddenException()
    }
  }

  @ApiOperation({ summary: '根据多个用户编号删除用户' })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, UserEntity))
  @Delete('list')
  async removeList(@Body() removeUserDto: RemoveUserDto, @User() user): Promise<ResponseGenerator> {
    const data = await this.userService.removeList(removeUserDto)
    return ResponseResult.success(data, '删除成功！', user)
  }

  @ApiOperation({ summary: '根据用户编号删除用户' })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, UserEntity))
  @Delete(':id')
  async remove(@Param('id') id: string, @User() user): Promise<ResponseGenerator> {
    const data = await this.userService.remove(id)
    return ResponseResult.success(data, '删除成功！', user)
  }
}
