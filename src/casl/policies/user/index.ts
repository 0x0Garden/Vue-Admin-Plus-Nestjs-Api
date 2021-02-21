import { Type } from '@nestjs/common'

import { PolicyHandler } from '../policy-handler.interface'
import { CreateUserPolicyHandler } from './create-user-policy.handler'
import { SearchUserPolicyHandler } from './search-user-policy.handler'

export const userPolicies: Type<PolicyHandler>[] = [CreateUserPolicyHandler, SearchUserPolicyHandler]
