import { PolicyHandler } from '../policy-handler.interface'
import { AppAbility } from '@/casl/casl-ability.factory'
import { Action } from '@/casl/enums/action.enum'
import { UserEntity } from '@/user/user.entity'

export class CreateUserPolicyHandler implements PolicyHandler {
  handle(appAbility: AppAbility): boolean {
    return appAbility.can(Action.CREATE, UserEntity)
  }
}
