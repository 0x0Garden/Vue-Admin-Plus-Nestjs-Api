import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response, Request } from 'express'

import { LoggerService } from '@/logger/logger.service'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    const request = context.getRequest<Request>()
    const status = exception.getStatus()
    const message = exception.getResponse()['message']

    this.logger.log(`${request.url} - ${message}`, '非正常接口请求')

    response.status(status).json({
      statusCode: status,
      message: message,
      path: request.url,
      timestamp: new Date().toISOString()
    })
  }
}
