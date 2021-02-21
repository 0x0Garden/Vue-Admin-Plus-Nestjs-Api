import { IsNotEmpty, IsString } from 'class-validator'

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string

  @IsString()
  readonly content: string
}
