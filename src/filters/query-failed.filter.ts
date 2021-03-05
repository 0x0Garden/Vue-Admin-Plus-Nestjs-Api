/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：query-failed.filter.ts
 * 创建日期：2021年03月05日
 * 创建作者：Jaxson
 */

import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { QueryFailedError } from 'typeorm'
import { Response } from 'express'
import { STATUS_CODES } from 'http'

const constraintErrors: Record<string, string> = {
  UQ_97672ac88f789774dd47f7c8be3: 'error.unique.email'
}

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  constructor(public reflector: Reflector) {}

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const errorMessage = constraintErrors[exception.constraint]

    const status = exception.constraint && exception.constraint.startsWith('UQ') ? HttpStatus.CONFLICT : HttpStatus.INTERNAL_SERVER_ERROR

    response.status(status).json({
      statusCode: status,
      error: STATUS_CODES[status],
      message: errorMessage
    })
  }
}
