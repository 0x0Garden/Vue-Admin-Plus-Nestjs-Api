import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { UserEntity } from '@/user/user.entity'

export const ReqUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest()
  const user: UserEntity = req.user
  return user as UserEntity
})
