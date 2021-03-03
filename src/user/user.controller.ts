/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：user.controller.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger'

import { UserService } from './user.service'
import { UserEntity } from '@/user/entities/user.entity'
import { CreateUserDto, QueryUserDto } from './dto'
import { Acl } from '@/casl/decorators/acl.decorator'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
// import { CheckPolicies } from '@/casl/decorators/check-policies.decorator'
// import { CreateUserPolicyHandler } from '@/casl/policies/user/create-user-policy.handler'
import { Public } from '@/auth/decorators/public.decorator'
import { ResponseGenerator, ResponseResult } from '@/utils/response.result'

@ApiBearerAuth()
@ApiTags('用户管理')
@Acl(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '用户创建' })
  // @CheckPolicies(CreateUserPolicyHandler)
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto)
  }

  @ApiOperation({ summary: '查询所有用户信息列表' })
  @Get()
  async findAll(@Query() queryUserDto: QueryUserDto): Promise<ResponseGenerator> {
    const data = await this.userService.filterAndPageQuery(queryUserDto)
    return ResponseResult.success(data, '获取成功')
  }

  @ApiOperation({ summary: '根据用户编号查询用户信息' })
  @Get(':id')
  findOne(@Param('id') username: string): Promise<UserEntity> {
    return this.userService.findByUsername(username)
  }

  @ApiOperation({ summary: '根据用户编号删除用户' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id)
  }
}
