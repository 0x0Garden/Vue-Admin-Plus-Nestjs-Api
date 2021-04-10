/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：transform.interceptor.ts
 * 创建日期：2021年03月27日
 * 创建作者：Jaxson
 */

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Request } from 'express'

import { LoggerService } from '@/logger/logger.service'

interface Response<T> {
  data: T
}

interface HasTokenUserEntity extends Express.User {
  token?: string
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private logger: LoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>()
    const user: HasTokenUserEntity = request.user

    this.logger.log(request.url, '正常接口请求')

    return next.handle().pipe(
      map(data => {
        const result = data
        // 判断接口是否更新 Token
        if (user.token) result['token'] = user.token
        return {
          data: result,
          statusCode: 200,
          message: '请求成功'
        }
      })
    )
  }
}
