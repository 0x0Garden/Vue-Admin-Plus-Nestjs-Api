/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：user.entity.ts
 * 创建日期：2021年03月02日
 * 创建作者：Jaxson
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer'

import { Role } from '../enums/role.enum'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: '用户编号'
  })
  id: string

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: '登录用户'
  })
  username: string

  @Column({
    type: 'varchar',
    length: 200,
    comment: '密码'
  })
  password: string

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    comment: '邮箱'
  })
  email: string

  @Column({
    comment: '昵称'
  })
  nickname: string

  @Column({
    type: 'simple-enum',
    enum: Role,
    default: Role.User,
    comment: '角色身份'
  })
  role: Role

  @Column({
    default: true,
    comment: '用户状态'
  })
  isActive: boolean

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
