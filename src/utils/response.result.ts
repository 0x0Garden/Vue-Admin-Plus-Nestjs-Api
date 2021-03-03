/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：response.result.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { StatusCode } from './enum/code.enum'

export interface ResponseGenerator {
  statusCode: number
  message: string
  data?: any
}

export interface PaginationRO {
  totalCount: number
  totalPage: number
  currentPage: number
  pageSize: number
  list: Array<any>
}

export class ResponseResult {
  /**
   * 业务处理响应成功
   * @param data
   * @param message
   */
  static success(data: any = {}, message = 'success'): ResponseGenerator {
    return {
      statusCode: StatusCode.SUCCESS,
      message,
      data
    }
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
