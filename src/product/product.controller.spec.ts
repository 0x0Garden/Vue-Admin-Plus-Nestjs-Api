import { Test, TestingModule } from '@nestjs/testing'
import { ProductsController } from './product.controller'
import { ProductService } from './product.service'

describe('AppController', () => {
  let appController: ProductsController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductService]
    }).compile()

    appController = app.get<ProductsController>(ProductsController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      console.log(appController)
      // expect(appController.getHello()).toBe('Hello World!')
    })
  })
})
