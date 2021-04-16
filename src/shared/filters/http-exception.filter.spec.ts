import { HttpExceptionFilter } from './http-exception.filter'
import { LoggerService } from '@/logger/logger.service'

describe('HttpExceptionFilter', () => {
  it('should be defined', () => {
    const logger = new LoggerService('logs')
    expect(new HttpExceptionFilter(logger)).toBeDefined()
  })
})
