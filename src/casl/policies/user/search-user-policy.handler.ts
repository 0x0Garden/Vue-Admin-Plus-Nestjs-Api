import { PolicyHandler } from '../policy-handler.interface'
import { AppAbility } from '@/casl/casl-ability.factory'
import { UserEntity } from '@/user/user.entity'
import { Action } from '@/casl/enums/action.enum'

export class SearchUserPolicyHandler implements PolicyHandler {
  constructor(private usernameToSearch: string) {}

  handle(appAbility: AppAbility): boolean {
    if (!this.usernameToSearch) return false
    const mockUserToSearch: UserEntity = new UserEntity()
    mockUserToSearch.username = this.usernameToSearch
    return appAbility.can(Action.READ, mockUserToSearch)
  }
}
