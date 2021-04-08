/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：app.controller.ts
 * 创建日期：2021年03月31日
 * 创建作者：Jaxson
 */

import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger'

import { LocalAuthGuard } from '@/auth/guards/local-auth.guard'
import { AuthService } from '@/auth/auth.service'
import { LoginUserDto } from '@/user/dto'
import { Public } from '@/auth/decorators/public.decorator'
import { UserData } from '@/user/user.interface'

@ApiTags('全局')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 登录接口
   * @param loginUser
   */
  @ApiOperation({ summary: '系统登录接口' })
  @ApiBody({ type: LoginUserDto })
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Body() loginUser: LoginUserDto): Promise<UserData> {
    const authResult = await this.authService.validateUser(loginUser)
    const token = await this.authService.certificate(authResult)
    return await this.authService.loginUserData(authResult, token)
  }
}
