/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：response.result.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

export interface PaginationRO {
  totalCount: number
  totalPage: number
  currentPage: number
  pageSize: number
  list: Array<any>
}
