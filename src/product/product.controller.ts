import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Product as ProductModel } from './product.model'
import { ProductService } from './product.service'

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductService) {}

  @Get()
  async getAll(): Promise<ProductModel[]> {
    return this.productsService.getAll()
  }

  @Get(':id')
  async getOne(@Param() params): Promise<ProductModel> {
    return this.productsService.getOne(params.id)
  }

  @Post()
  async create(@Body() product: ProductModel) {
    await this.productsService.create(product)
  }

  @Put()
  async alter(
    @Body() product: ProductModel
  ): Promise<[number, ProductModel[]]> {
    return this.productsService.alter(product)
  }

  @Delete(':id')
  async delete(@Param() params) {
    await this.productsService.delete(params.id)
  }
}
