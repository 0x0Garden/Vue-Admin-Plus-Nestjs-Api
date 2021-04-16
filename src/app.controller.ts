/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：app.controller.ts
 * 创建日期：2021年03月31日
 * 创建作者：Jaxson
 */

import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger'

import { LocalAuthGuard } from '@/auth/guards/local-auth.guard'
import { AuthService } from '@/auth/auth.service'
import { LoginUserDto } from '@/user/dto'
import { Public } from '@/auth/decorators/public.decorator'
import { UserData } from '@/user/user.interface'

@ApiTags('全局')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {}

  @Public()
  @Get('')
  hello() {
    return {
      data: 'Hello World',
      Api: `http://localhost:${this.configService.get<number>('port')}/api`,
      Docs: `http://localhost:${this.configService.get<number>('port')}/docs`,
      ProjectGithub: 'https://github.com/0x0Garden/Vue-Admin-Plus-Nestjs-Api',
      MyGithub: 'https://github.com/JaxsonWang',
      MyBlog: 'https://iiong.com',
      MyEmail: 'i@iiong.com'
    }
  }

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
