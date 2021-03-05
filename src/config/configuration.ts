/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：configuration.ts
 * 创建日期：2021年03月05日
 * 创建作者：Jaxson
 */

export default () => ({
  port: parseInt(process.env.NESTJS_PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    prefix: process.env.DATABASE_PREFIX
  },
  jwt: {
    expired: process.env.JWT_EXPIRED,
    secret: process.env.JWT_SECRET
  }
})
