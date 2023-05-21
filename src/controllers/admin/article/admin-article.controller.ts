import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ArticleEntryDto } from '../../../models/article/article.dto';
import { ParseIntPipeWithDefaultValue } from '../../../shared/pipes/parse-int-with-default-value.pipe';
import { ArticleService } from '../../../services/article/article.service';
import { ArticleListPaginationVM, ArticleVM, ArticleEntryVM } from '../../../models/article/article.vm';
import { RoleGuard } from '../../../guard/role.guard';

@ApiTags('Admin - Article')
@ApiBearerAuth()
@Controller('admin/article')
export class AdminArticleController {
  @Get('list')
  @ApiOkResponse({ type: ArticleListPaginationVM })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'keyword', required: false })
  @ApiQuery({ name: 'articleCategoryId', required: false })
  @UseGuards(RoleGuard('article.view'))
  async list(
    @Query('take', new ParseIntPipeWithDefaultValue(30)) take: number,
    @Query('skip', new ParseIntPipeWithDefaultValue(0)) skip: number,
    @Query('sort') sort: any,
    @Query('keyword') keyword: string,
    @Query('articleCategoryId') articleCategoryId: string,
  ) {
    return await ArticleService.findAll({ take, skip, keyword, sort }, { articleCategoryId });
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleVM })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @UseGuards(RoleGuard('article.view'))
  async load(@Param('id') articleId: Types.ObjectId) {
    return await ArticleService.findById(articleId);
  }

  @Post('create')
  @ApiOkResponse({ type: ArticleEntryVM })
  @UseGuards(RoleGuard('article.create'))
  async create(@Body() articleToCreate: ArticleEntryDto) {
    return await ArticleService.save(articleToCreate);
  }

  @Put(':id')
  @ApiOkResponse({ type: ArticleVM })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @UseGuards(RoleGuard('article.update'))
  async update(@Param('id') articleId: Types.ObjectId, @Body() articleToUpdate: ArticleEntryDto) {
    return await ArticleService.update(articleId, articleToUpdate);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @UseGuards(RoleGuard('article.delete'))
  async delete(@Param('id') articleId: Types.ObjectId) {
    return await ArticleService.delete(articleId);
  }
}
