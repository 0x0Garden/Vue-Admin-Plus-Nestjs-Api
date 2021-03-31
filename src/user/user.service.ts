/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：user.service.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BcryptService } from '@/shared/services/bcrypt.service'
import { CreateUserDto, QueryUserDto, RemoveUserDto, UpdateUserDto } from './dto'
import { UserEntity } from '@/user/entities/user.entity'
import { PaginationRO } from '@/utils/response.result'

interface UserPaginationRO extends PaginationRO {
  list: UserEntity[]
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private bcryptService: BcryptService
  ) {}

  /**
   * 用户创建
   * @param createUserDto
   */
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username, password, email, nickname } = createUserDto
    // 检查身份用户名和邮箱是否存在
    const queryBuilderUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email })
      .getOne()
    if (queryBuilderUser) {
      throw new BadRequestException('用户帐号或者用户邮箱重复，请重新再注册！')
    }

    const user = new UserEntity()
    user.username = username
    user.password = await this.bcryptService.hash(password)
    user.email = email
    user.nickname = nickname

    return this.userRepository.save(user)
  }

  /**
   * 查找用户
   */
  async filterAndPageQuery({
    pageSize,
    currentPage,
    username,
    isActive,
    order
  }: QueryUserDto): Promise<UserPaginationRO> {
    const skippedItems: number = pageSize * (currentPage - 1)

    const queryBuilder = await this.userRepository.createQueryBuilder('user')
    if (username) queryBuilder.where('user.username like :username', { username: `${username}%` })
    if (isActive) queryBuilder.andWhere('user.isActive = :isActive', { isActive })
    queryBuilder.orderBy('created_time', order).skip(skippedItems).take(pageSize)

    const totalCount: number = await queryBuilder.getCount()
    const users: UserEntity[] = await queryBuilder.getMany()

    return {
      totalCount: totalCount,
      totalPage: Math.ceil(totalCount / pageSize),
      currentPage: currentPage,
      pageSize: pageSize,
      list: users
    }
  }

  /**
   * 根据编码查询
   * @param id
   */
  findById(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id)
  }

  updateById(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userRepository.update(id, updateUserDto)
  }

  /**
   * 删除用户
   * @param id
   */
  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }

  /**
   * 删除用户
   * @param list
   */
  async removeList({ list }: RemoveUserDto): Promise<void> {
    await this.userRepository.delete(list)
  }
}
