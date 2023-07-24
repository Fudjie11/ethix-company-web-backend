import { Module } from '@nestjs/common';
import { AdminTagController } from '../../controllers/admin/tag/admin-tag.controller';
import { TagService } from './tag.service';

@Module({
    controllers: [
        AdminTagController
    ],
    providers: [
        TagService
    ],
    exports: [
        TagService
    ],
})
export class TagModule {
    //
}
