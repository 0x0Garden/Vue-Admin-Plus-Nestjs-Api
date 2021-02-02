import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'

import { ProductsController } from './product.controller'
import { ProductService } from './product.service'
import { Product as ProductModel } from './product.model'

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: true
    }),
    SequelizeModule.forFeature([ProductModel])
  ],
  controllers: [ProductsController],
  providers: [ProductService]
})
export class ProductModule {}
