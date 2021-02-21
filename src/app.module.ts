import { Connection } from 'typeorm'
import { Module, ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common'
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { TypeOrmConfigModule } from './config/typeorm.config'
import { AppController } from './app.controller'
import { UserModule } from './user/user.module'
import { LoginModule } from './login/login.module'
import { CaslModule } from './casl/casl.module'
// import { ArticleModule } from './article/article.module';

@Module({
  // imports: [TypeOrmModule.forRoot(TypeOrmConfigModule), UserModule, LoginModule, CaslModule, ArticleModule],
  imports: [TypeOrmModule.forRoot(TypeOrmConfigModule), LoginModule, UserModule, CaslModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidUnknownValues: true
      })
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ]
})
export class AppModule {
  constructor(private connection: Connection) {}
}
