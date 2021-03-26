/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：app.controller.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiOperation, ApiCreatedResponse, ApiUnauthorizedResponse } from '@nestjs/swagger'

import { LocalAuthGuard } from '@/auth/guards/local-auth.guard'
import { AuthService } from '@/auth/auth.service'
import { LoginUserDto } from '@/user/dto'
import { Public } from '@/auth/decorators/public.decorator'
import { ResponseGenerator, ResponseResult } from '@/utils/response.result'
import { StatusCode } from '@/utils/enum/code.enum'
import { UserEntityHasToken } from '@/auth/dtos'

import { UserEntity } from '@/user/entities/user.entity'
import { Action } from '@/casl/enums/action.enum'
import { CheckPolicies, PoliciesGuard } from '@/casl/guards/policies.guard'
import { AppAbility } from '@/casl/casl-ability.factory'

@ApiBearerAuth()
@ApiTags('全局')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 登录接口
   * @param loginUser
   */
  @ApiOperation({ summary: '系统登录接口' })
  @ApiCreatedResponse({ description: '登录成功' })
  @ApiUnauthorizedResponse({ description: '未经授权' })
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Body() loginUser: LoginUserDto): Promise<ResponseGenerator> {
    const authResult = await this.authService.validateUser(loginUser)
    let data: ResponseGenerator
    switch (authResult.code) {
      case 200:
        const token = await this.authService.certificate(authResult.data)
        data = ResponseResult.success(await this.authService.loginUserData(authResult.data, token), '登录成功')
        break
      case 400:
        data = ResponseResult.fail(StatusCode.BUSINESS_FAIL, '登录失败，用户不存在或者密码不正确！')
        break
      default:
        data = ResponseResult.fail(StatusCode.TIMEOUT, '未知错误')
    }
    return data
  }

  @ApiOperation({ summary: '获取用户信息' })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.READ, UserEntity))
  @Get('getInfo')
  async getInfo(@Request() req): Promise<ResponseGenerator> {
    const data: UserEntityHasToken = req.user
    return ResponseResult.success(data, '获取成功')
  }
}
