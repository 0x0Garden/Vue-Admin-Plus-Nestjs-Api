/*
 * Copyright (c) 2021 Jaxson
 * 项目名称：Vue-Admin-Plus-Nestjs-Api
 * 文件名称：validation.pipe.ts
 * 创建日期：2021年03月27日
 * 创建作者：Jaxson
 */

import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform<T>(value: T, metadata: ArgumentMetadata): Promise<T> {
    if (!value) {
      throw new BadRequestException('没有数据提交')
    }
    const { metatype } = metadata
    // 如果没有传入验证规则，则不验证，直接返回数据
    if (!metatype || !ValidationPipe.toValidate(metatype)) {
      return value
    }
    // 将对象转换为 Class 来验证
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      throw new HttpException(
        {
          message: '输入数据验证失败',
          errors: this.buildError(errors)
        },
        HttpStatus.BAD_REQUEST
      )
    }

    return value
  }

  private buildError(errors) {
    const result = {}
    errors.forEach(error => {
      const prop = error.property
      // 只需要取第一个错误信息并返回即可
      Object.entries(error.constructor).forEach(constraint => {
        result[prop + constraint[0]] = `${constraint[1]}`
      })
    })
    return result
  }

  private static toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
