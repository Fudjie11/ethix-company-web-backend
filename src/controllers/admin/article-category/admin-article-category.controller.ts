import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ArticleCategoryEntryDto } from '../../../models/article-category/article-category.dto';
import { ParseIntPipeWithDefaultValue } from '../../../shared/pipes/parse-int-with-default-value.pipe';
import { ArticleCategoryService } from '../../../services/article-category/article-category.service';
import { ArticleCategoryListPaginationVM, ArticleCategoryVM, ArticleCategoryEntryVM } from '../../../models/article-category/article-category.vm';
import { RoleGuard } from '../../../guard/role.guard';

@ApiTags('Admin - Article Category')
@ApiBearerAuth()
@Controller('admin/article-category')
export class AdminArticleCategoryController {
  @Get('list')
  @ApiOkResponse({ type: ArticleCategoryListPaginationVM })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'keyword', required: false })
  @UseGuards(RoleGuard('article-category.view'))
  async list(
    @Query('take', new ParseIntPipeWithDefaultValue(30)) take: number,
    @Query('skip', new ParseIntPipeWithDefaultValue(0)) skip: number,
    @Query('keyword') keyword: string
  ) {
    return ArticleCategoryService.findAll({ take, skip, keyword });
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleCategoryVM })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @UseGuards(RoleGuard('article-category.view'))
  async load(@Param('id') articleCategoryId: Types.ObjectId) {
    return ArticleCategoryService.findById(articleCategoryId);
  }

  @Post('create')
  @ApiOkResponse({ type: ArticleCategoryEntryVM })
  @UseGuards(RoleGuard('article-category.create'))
  async create(@Body() payload: ArticleCategoryEntryDto) {
    return ArticleCategoryService.save(payload);
  }

  @Put(':id')
  @ApiOkResponse({ type: ArticleCategoryVM })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @UseGuards(RoleGuard('article-category.update'))
  async update(@Param('id') articleCategoryId: Types.ObjectId, @Body() payload: ArticleCategoryEntryDto) {
    return ArticleCategoryService.update(articleCategoryId, payload);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @UseGuards(RoleGuard('article-category.delete'))
  async delete(@Param('id') articleCategoryId: Types.ObjectId) {
    return ArticleCategoryService.delete(articleCategoryId);
  }
}
