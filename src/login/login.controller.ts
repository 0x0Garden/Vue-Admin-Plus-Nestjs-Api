/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：login.controller.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Controller, Post, Body } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger'

import { AuthService } from '@/auth/auth.service'
import { LoginUserDto } from '@/login/dto'
import { Public } from '@/auth/decorators/public.decorator'
import { ResponseGenerator, ResponseResult } from '@/utils/response.result'

@ApiBearerAuth()
@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '系统登录接口' })
  @Public()
  @Post('')
  async login(@Body() loginUser: LoginUserDto) {
    const authResult = await this.authService.validateUser(loginUser)
    let data: ResponseGenerator
    switch (authResult.code) {
      case 200:
        const token = await this.authService.certificate(authResult.user)
        data = ResponseResult.success(await this.authService.loginUserData(authResult.user, token), '登录成功')
        break
      case 400:
        data = ResponseResult.fail(400, '登录失败，请检查用户名或者密码是否正确！')
        break
      default:
        data = ResponseResult.fail(-1, '未知错误')
    }
    return data
  }
}
