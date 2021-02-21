import { Provider } from '@nestjs/common'

import { userPolicyProviders } from './user'

export const aclProviders: Provider[] = [...userPolicyProviders]
