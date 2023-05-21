import { Module } from '@nestjs/common';
import { AdminWarehouseController } from '../../controllers/admin/warehouse/admin-warehouse.controller';
import { WarehouseService } from './warehouse.service';

@Module({
    controllers: [
        AdminWarehouseController
    ],
    providers: [
        WarehouseService
    ],
    exports: [
        WarehouseService
    ],
})
export class WarehouseModule {
    //
}
