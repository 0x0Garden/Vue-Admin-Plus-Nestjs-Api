import { Provider } from '@nestjs/common'

import { CreateUserPolicyHandler } from '../../policies/user/create-user-policy.handler'

export const CreateUserPolicyProvider: Provider = CreateUserPolicyHandler
