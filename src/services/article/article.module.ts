import { Module } from '@nestjs/common';
import { AdminArticleController } from '../../controllers/admin/article/admin-article.controller';
import { PublicNewsController } from '../../controllers/public/article/public-article.controller';
import { ArticleService } from './article.service';

@Module({
    controllers: [
        AdminArticleController,
        PublicNewsController
    ],
    providers: [
        ArticleService
    ],
    exports: [
        ArticleService
    ],
})
export class ArticleModule {
    //
}
