import { Controller, Post, Body } from '@nestjs/common'

import { LoginUserDto } from '@/user/dto'
import { AuthService } from '@/auth/auth.service'
import { Public } from '@/auth/decorators/public.decorator'

@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.validateUser(loginUserDto)
  }
}
