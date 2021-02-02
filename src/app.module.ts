import { Module } from '@nestjs/common'
import { AppModule } from './app/app.module'
import { ProductModule } from './product/product.module'

@Module({
  imports: [AppModule, ProductModule]
})
export class ApplicationModule {}
