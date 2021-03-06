/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：user.service.ts
 * 创建日期：2021年02月22日
 * 创建作者：Jaxson
 */

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BcryptService } from '@/shared/services/bcrypt.service'
import { CreateUserDto, QueryUserDto } from './dto'
import { UserEntity } from '@/user/entities/user.entity'
import { PaginationRO, ServiceRO } from '@/utils/response.result'
import { StatusCode } from '@/utils/enum/code.enum'

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
  async create(createUserDto: CreateUserDto): Promise<ServiceRO> {
    const { username, password, email, nickname } = createUserDto
    // 检查身份用户名和邮箱是否存在
    const queryBuilderUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email })
      .getOne()
    if (queryBuilderUser) {
      return {
        code: StatusCode.BUSINESS_FAIL
      }
    }

    const user = new UserEntity()
    user.username = username
    user.password = await this.bcryptService.hash(password)
    user.email = email
    user.nickname = nickname

    return {
      code: StatusCode.SUCCESS,
      data: this.userRepository.save(user)
    }
  }

  /**
   * 查找用户
   */
  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find()
  }

  /**
   * 查找用户
   */
  async filterAndPageQuery({ pageSize = 10, currentPage = 1, order = 'DESC' }: QueryUserDto): Promise<PaginationRO> {
    const skippedItems: number = pageSize * (currentPage - 1)

    const totalCount: number = await this.userRepository.count()

    const users: UserEntity[] = await this.userRepository
      .createQueryBuilder('user')
      .orderBy('created_time', order)
      // .where(username as Partial<UserEntity>)
      .skip(skippedItems)
      .take(pageSize)
      .getMany()

    return {
      totalCount,
      totalPage: Math.ceil(totalCount / pageSize),
      currentPage: currentPage,
      pageSize: pageSize,
      list: users
    }
  }

  /**
   * 根据登录账号查询
   * @param username
   */
  async findByUsername(username: string): Promise<UserEntity> {
    return (await this.userRepository.findOne({ username })) || null
  }

  /**
   * 根据编码查询
   * @param id
   */
  findById(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id)
  }

  /**
   * 删除用户
   * @param id
   */
  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
