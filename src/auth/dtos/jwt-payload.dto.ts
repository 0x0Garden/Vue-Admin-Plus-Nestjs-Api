import { Role } from '@/user/enums/role.enum'

export class JwtPayload {
  username: string
  role: Role
  sub: string
}
