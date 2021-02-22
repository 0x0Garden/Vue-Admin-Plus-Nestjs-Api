/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：response.result.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { StatusCode } from './enum/code.enum'

export interface ResponseGenerator {
  code: number
  message: string
  data?: any
}

export class ResponseResult {
  /**
   * 业务处理响应成功
   * @param data
   * @param message
   */
  static success(data: any = {}, message = 'success'): ResponseGenerator {
    return {
      code: StatusCode.SUCCESS,
      message,
      data
    }
  }
  /**
   * 业务处理响应失败
   * @param code
   * @param message
   */
  static fail(code: number, message: string): ResponseGenerator {
    return {
      code,
      message
    }
  }
}
