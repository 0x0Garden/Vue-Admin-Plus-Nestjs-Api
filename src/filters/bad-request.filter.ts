/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：bad-request.filter.ts
 * 创建日期：2021年03月05日
 * 创建作者：Jaxson
 */

import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ValidationError, isEmpty } from 'class-validator'
import { Response } from 'express'
import { STATUS_CODES } from 'http'

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  constructor(public reflector: Reflector) {}

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    let statusCode = exception.getStatus()
    const r = <any>exception.getResponse()

    if (Array.isArray(r.message) && r.message[0] instanceof ValidationError) {
      statusCode = HttpStatus.UNPROCESSABLE_ENTITY
      const validationErrors = <ValidationError[]>r.message
      this._validationFilter(validationErrors)
    }

    r.statusCode = statusCode
    r.error = STATUS_CODES[statusCode]

    response.status(statusCode).json(r)
  }

  private _validationFilter(validationErrors: ValidationError[]) {
    for (const validationError of validationErrors) {
      for (const [constraintKey, constraint] of Object.entries(validationError.constraints)) {
        if (!constraint) {
          // convert error message to error.fields.{key} syntax for i18n translation
          validationError.constraints[constraintKey] = 'error.fields.' + constraintKey
        }
      }
      if (!isEmpty(validationError.children)) {
        this._validationFilter(validationError.children)
      }
    }
  }
}
