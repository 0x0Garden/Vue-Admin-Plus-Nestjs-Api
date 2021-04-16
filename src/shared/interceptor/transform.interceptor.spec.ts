import { TransformInterceptor } from './transform.interceptor'
import { LoggerService } from '@/logger/logger.service'

describe('TransformInterceptor', () => {
  it('should be defined', () => {
    const logger = new LoggerService('logs')
    expect(new TransformInterceptor(logger)).toBeDefined()
  })
})
