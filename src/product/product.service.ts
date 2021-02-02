import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Product as ProductModel } from './product.model'

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel)
    private productModel: typeof ProductModel,
  ) {}

  async getAll(): Promise<ProductModel[]> {
    return this.productModel.findAll()
  }

  async getOne(id: number): Promise<ProductModel> {
    return this.productModel.findByPk(id)
  }

  async create(product: ProductModel) {
    await this.productModel.create(product)
  }

  async alter(product: ProductModel): Promise<[number, ProductModel[]]> {
    return this.productModel.update(product, {
      where: {
        id: product.id,
      },
    })
  }

  async delete(id: number) {
    const product: ProductModel = await this.getOne(id)
    if (product) {
      await product.destroy()
    }
  }
}
