import { Controller, Get, Post, Delete, Param, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'

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

  @Post()
  @CheckPolicies(CreateUserPolicyHandler)
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto)
  }

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id)
  }
}
