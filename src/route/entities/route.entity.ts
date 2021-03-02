/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：route.entity.ts
 * 创建日期：2021年03月02日
 * 创建作者：Jaxson
 */

import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as guid } from 'uuid'

@Entity('app_route')
export class RouteEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
    nullable: false,
    unique: true,
    comment: '路由编号'
  })
  id: string

  @BeforeInsert()
  updateId(): void {
    this.id = guid()
  }

  @Column({
    comment: '路由名称'
  })
  title: string

  @Column({
    comment: '路由图标'
  })
  icon: string

  @Column({
    comment: '路由路径'
  })
  path: string

  @Column({
    comment: '路由映射'
  })
  component: string

  // @Column({
  //   comment: '权限审计'
  // })
  // audit: any
}
