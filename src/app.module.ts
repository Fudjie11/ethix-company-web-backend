import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { DatabaseSetupService } from '../libs/dh-db/src/service/database-setup.service';
import { AppController } from './app.controller';
import { AdminArticleCategoryController } from './controllers/admin/article-category/admin-article-category.controller';
import { AdminArticleController } from './controllers/admin/article/admin-article.controller';
import { AdminFileController } from './controllers/admin/file/admin-file-controller';
import { PublicFileController } from './controllers/public/file/public-file-controller';
import { OAuth2Middleware } from './middleware/oauth2.middleware';
import { ArticleCategoryModule } from './services/article-category/article-category.module';
import { ArticleModule } from './services/article/article.module';
import { PermissionModule } from './services/role-permission/permission.module';
import { LocationModule } from './services/location/location.module';
import { AdminLocationController } from './controllers/admin/location/admin-location.controller';
import { RoleModule } from './services/role-permission/role.module';
import { UserManagementModule } from './services/user-management/user-management.module';
import { RequestContextMetadataMiddleware } from './shared/middlewares/request-context-metadata.middleware';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './guard/jwt-constant';
import { JwtStrategy } from './guard/jwt-strategy';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from './mail/mail.module';
import { UsersModule } from './services/user/user.module';
import { WarehouseModule } from './services/warehouse/warehouse.module';
import { PublicArticleCategoryController } from './controllers/public/article-category/public-article-category.controller';
import { PublicLocationController } from './controllers/public/location/location.controller';
import { PublicWarehouseController } from './controllers/public/warehouse/warehouse.controller';
import { TagModule } from './services/tag/tag.module';
import { AdminTagController } from './controllers/admin/tag/admin-tag.controller';
@Module({
    imports: [
        UsersModule,
        UserManagementModule,
        RoleModule,
        PermissionModule,
        ArticleModule,
        ArticleCategoryModule,
        TagModule,
        LocationModule,
        WarehouseModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            session: false,
        }),
        JwtModule.register({
            secret: jwtConstant.secret,
            signOptions: {
                expiresIn: jwtConstant.expiresIn,
            },
        }),
        ScheduleModule.forRoot(),
        MailModule
    ],
    controllers: [
        AppController,
        AdminArticleController,
        AdminArticleCategoryController,
        AdminTagController,
        AdminLocationController,
        AdminFileController,
        PublicFileController,
        PublicArticleCategoryController,
        PublicLocationController,
        PublicWarehouseController
    ],
    providers: [
        JwtStrategy,
    ],
})
export class AppModule implements NestModule {
    async onModuleInit() {
        await DatabaseSetupService.setup();
    }

    configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
        consumer.apply(RequestContextMetadataMiddleware).forRoutes('*');

        consumer
          .apply(OAuth2Middleware)
          .exclude(
            { path: '', method: RequestMethod.GET },
            { path: 'oauth2/connect/token', method: RequestMethod.POST },
            { path: 'login', method: RequestMethod.POST },
            { path: 'user/register', method: RequestMethod.POST },
            { path: 'user/token', method: RequestMethod.POST },
            { path: 'public/(.*)', method: RequestMethod.ALL },
          )
          .forRoutes('*');
    }
}
