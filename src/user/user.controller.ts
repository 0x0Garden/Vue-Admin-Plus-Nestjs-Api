/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：user.controller.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common'

import { UserService } from './user.service'
import { UserEntity } from './user.entity'
import { CreateUserDto } from './dto'
import { Acl } from '@/casl/decorators/acl.decorator'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { CheckPolicies } from '@/casl/decorators/check-policies.decorator'
import { CreateUserPolicyHandler } from '@/casl/policies/user/create-user-policy.handler'

@Controller('user')
@Acl(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @CheckPolicies(CreateUserPolicyHandler)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto)
  }

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') username: string): Promise<UserEntity> {
    return this.userService.findByUsername(username)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id)
  }
}
