import { Type } from '@nestjs/common'

import { PolicyHandler } from './policy-handler.interface'

import { userPolicies } from './user'

export * from './user'

export const policies: Type<PolicyHandler>[] = [...userPolicies]
