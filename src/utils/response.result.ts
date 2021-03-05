/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：response.result.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { StatusCode } from './enum/code.enum'
import { UserEntityHasToken } from '@/auth/dtos'

export interface ResponseGenerator {
  statusCode: number
  message: string
  data?: any
  token?: string
}

export interface PaginationRO {
  totalCount: number
  totalPage: number
  currentPage: number
  pageSize: number
  list: Array<any>
}

export interface ServiceRO {
  code: number
  data?: any
}

export class ResponseResult {
  /**
   * 业务处理响应成功
   * @param data
   * @param message
   * @param user
   */
  static success(data: any = {}, message = 'success', user?: UserEntityHasToken): ResponseGenerator {
    const response: ResponseGenerator = {
      statusCode: StatusCode.SUCCESS,
      message,
      data
    }
    if (user && user.token) response.token = user.token
    return response
  }
  /**
   * 业务处理响应失败
   * @param statusCode
   * @param message
   */
  static fail(statusCode: number, message: string): ResponseGenerator {
    return {
      statusCode,
      message
    }
  }
}
