import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { MBaseListPayload } from '../base/base-list-payload';
import { MBaseListResponse } from '../base/base-list-response';

export class ArticleCategoryVM {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;
}

export class ArticleVM {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  caption: string;

  @ApiProperty()
  authorName: string;

  @ApiProperty()
  articleCategory: ArticleCategoryVM;

  @ApiProperty()
  description: string;

  @ApiProperty()
  route: string;

  @ApiProperty()
  fileUrls: string[];
}

export class ArticleEntryVM {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  caption: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
  
  @ApiProperty()
  @IsOptional()
  route: string;
  
  @ApiProperty()
  authorName: string;
  
  @ApiProperty()
  articleCategoryId: string;
  
  @ApiProperty()
  fileUrls: string[];
}

export class ArticleListPaginationVM extends MBaseListResponse<ArticleVM[]> {
  @ApiProperty()
  @IsOptional()
  articleCategoryId?: string;
}

export class PayloadArticleVm extends MBaseListPayload {
  @ApiProperty()
  articleCategoryId?: string;
}