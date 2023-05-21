import { Types } from 'mongoose';
import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ArticleCategoryService } from '../../../services/article-category/article-category.service';
import { ArticleCategoryVM, ArticleCategoryListPaginationVM } from '../../../models/article-category/article-category.vm';
import { ParseIntPipeWithDefaultValue } from '../../../shared/pipes/parse-int-with-default-value.pipe';

@Controller('public/article-category')
@ApiTags('Public Article Category')
export class PublicArticleCategoryController {
    @Get()
    @ApiOkResponse({type: ArticleCategoryListPaginationVM})
    @ApiQuery({ name: 'take', required: false })
    @ApiQuery({ name: 'skip', required: false })
    @ApiQuery({ name: 'keyword', required: false })
    async list(
        @Query('take', new ParseIntPipeWithDefaultValue(30)) take: number,
        @Query('skip', new ParseIntPipeWithDefaultValue(0)) skip: number,
        @Query('keyword') keyword: string
    ) {
        const data = await ArticleCategoryService.findAll({ take, skip, keyword });
        return data;
    }

    @Get(':id')
    @ApiOkResponse({type: ArticleCategoryVM})
    @ApiParam({ name: 'id', required: true, type: 'string' })
    async load(@Param('id') id: Types.ObjectId) {
        const data = await ArticleCategoryService.findById(id);
        return data;
    }
}
