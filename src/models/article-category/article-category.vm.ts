import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { MBaseListResponse } from '../base/base-list-response';
import { Types } from 'mongoose';

export class ArticleCategoryVM {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isActive: boolean;
}

export class ArticleCategoryEntryVM {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  isActive: boolean;
}

export class ArticleCategoryListPaginationVM extends MBaseListResponse<ArticleCategoryVM[]> {}