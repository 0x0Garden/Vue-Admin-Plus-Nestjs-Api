import { Module, Global } from '@nestjs/common'

import { CaslAbilityFactory } from './casl-ability.factory'
import { aclProviders } from './providers'
import { policies } from './policies'

@Global()
@Module({
  providers: [CaslAbilityFactory, ...aclProviders],
  exports: [CaslAbilityFactory, ...policies]
})
export class CaslModule {}
