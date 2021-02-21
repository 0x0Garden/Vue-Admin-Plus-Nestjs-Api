import { AppAbility } from '../casl-ability.factory'

export interface PolicyHandler {
  handle(appAbility: AppAbility): boolean
}
