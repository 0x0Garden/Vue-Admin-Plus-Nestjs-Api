/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：app.controller.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Controller, Get, Post, Body, Request } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger'

import { AuthService } from '@/auth/auth.service'
import { LoginUserDto } from '@/user/dto'
import { Public } from '@/auth/decorators/public.decorator'
import { ResponseGenerator, ResponseResult } from '@/utils/response.result'
import { StatusCode } from '@/utils/enum/code.enum'
import { User } from '@/auth/decorators'
import { UserEntityHasToken } from '@/auth/dtos'

@ApiBearerAuth()
@ApiTags('全局')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 登录接口
   * @param loginUser
   * @param user
   */
  @ApiOperation({ summary: '系统登录接口' })
  @Public()
  @Post('login')
  async login(@Body() loginUser: LoginUserDto): Promise<ResponseGenerator> {
    const authResult = await this.authService.validateUser(loginUser)
    let data: ResponseGenerator
    switch (authResult.statusCode) {
      case 200:
        const token = await this.authService.certificate(authResult.user)
        data = ResponseResult.success(await this.authService.loginUserData(authResult.user, token), '登录成功')
        break
      case 400:
        data = ResponseResult.fail(StatusCode.BUSINESS_FAIL, '登录失败，请检查用户名或者密码是否正确！')
        break
      default:
        data = ResponseResult.fail(StatusCode.TIMEOUT, '未知错误')
    }
    return data
  }

  @ApiOperation({ summary: '获取用户信息' })
  @Get('getInfo')
  async getInfo(@Request() req): Promise<ResponseGenerator> {
    const data: UserEntityHasToken = req.user
    if (data.token) delete data.token
    return ResponseResult.success(data, '获取成功')
  }
}
