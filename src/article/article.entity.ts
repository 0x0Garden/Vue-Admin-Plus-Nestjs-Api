/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：article.entity.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Entity, Column, PrimaryColumn, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('app_article')
export class ArticleEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
    unique: true,
    comment: '文章编号'
  })
  id: string

  @BeforeInsert()
  updateId(): void {
    this.id = uuidV4()
  }

  @Column({
    type: 'text',
    length: 0,
    nullable: false,
    comment: '文章标题'
  })
  title: string

  @Column({
    type: 'longtext',
    length: 0,
    comment: '文章正文'
  })
  content: string

  @Column({
    type: 'varchar',
    name: 'user_id',
    length: 36,
    nullable: false,
    comment: '用户编号'
  })
  userId: string

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_time',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '创建时间'
  })
  createdTime: Date

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_time',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    comment: '更新时间'
  })
  updatedTime: Date
}
