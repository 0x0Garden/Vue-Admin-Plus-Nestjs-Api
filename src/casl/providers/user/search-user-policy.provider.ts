import { Provider } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'

import { SearchUserPolicyHandler } from '../../policies/user/search-user-policy.handler'

export const SearchUserPolicyProvider: Provider = {
  provide: SearchUserPolicyHandler,
  inject: [REQUEST],
  useFactory: (request: Request) => {
    return new SearchUserPolicyHandler(request.params.username)
  }
}
