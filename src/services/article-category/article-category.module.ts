import { Module } from '@nestjs/common';
import { AdminArticleCategoryController } from '../../controllers/admin/article-category/admin-article-category.controller';
import { ArticleCategoryService } from './article-category.service';

@Module({
    controllers: [
        AdminArticleCategoryController
    ],
    providers: [
        ArticleCategoryService
    ],
    exports: [
        ArticleCategoryService
    ],
})
export class ArticleCategoryModule {
    //
}
