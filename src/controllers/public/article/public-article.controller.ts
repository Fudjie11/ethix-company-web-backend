import { Types } from 'mongoose';
import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ArticleListPaginationVM, ArticleVM, PayloadArticleVm } from '../../../models/article/article.vm';
import { ArticleService } from '../../../services/article/article.service';

@Controller('public/news')
@ApiTags('Public News')
export class PublicNewsController {
    @Get()
    @ApiOkResponse({type: ArticleListPaginationVM})
    async getNews(@Query() params: PayloadArticleVm) {
        const data = await ArticleService.findAllPublic(params);
        return data;
    }

    @Get(':route')
    @ApiOkResponse({type: ArticleVM})
    async getNewsByRoute(@Param('route') route: string) {
        const data = await ArticleService.findByRoute(route);
        return data;
    }

    @Get(':id/detail')
    @ApiOkResponse({type: ArticleVM})
    @ApiParam({ name: 'id', required: true, type: 'string' })
    async getNewsById(@Param('id') id: Types.ObjectId) {
        const data = await ArticleService.findById(id);
        return data;
    }
}
