import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserService } from '@/user/user.service'
import { UserEntity } from '@/user/user.entity'
import { LoginUserDto } from '@/user/dto'
import { JwtPayload } from '@/auth/dtos'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  /**
   * 验证用户
   * @param username
   * @param password
   */
  async validateUser({ username, password }: LoginUserDto): Promise<string> {
    const user = await this.userService.findOne(username)
    if (user && user.password === password) {
      const payload: JwtPayload = {
        username: user.username,
        role: user.role,
        sub: user.id
      }
      return this.jwtService.sign(payload)
      // return user
    }
    return null
  }

  /**
   * 向用户颁发 JWT
   * @param user
   */
  async login(user: UserEntity) {
    const payload: JwtPayload = {
      username: user.username,
      role: user.role,
      sub: user.id
    }
    return this.jwtService.sign(payload)
  }

  /**
   * 从 JWT 检索用户信息
   * @param jwtPayload
   */
  async retrieveUserFromJwt(jwtPayload: JwtPayload): Promise<UserEntity | null> {
    const user: UserEntity = await this.userService.findById(jwtPayload.sub)
    if (user && user.username === jwtPayload.username) {
      return user
    }
    return null
  }
}
