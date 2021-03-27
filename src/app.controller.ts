/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：app.controller.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger'

import { LocalAuthGuard } from '@/auth/guards/local-auth.guard'
import { AuthService } from '@/auth/auth.service'
import { LoginUserDto } from '@/user/dto'
import { Public } from '@/auth/decorators/public.decorator'
import { ResponseGenerator, ResponseResult } from '@/utils/response.result'
import { StatusCode } from '@/utils/enum/code.enum'

@ApiTags('全局')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 登录接口
   * @param loginUser
   */
  @ApiOperation({ summary: '系统登录接口' })
  @ApiBody({
    type: LoginUserDto
  })
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
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
}
