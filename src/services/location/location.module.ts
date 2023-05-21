import { Module } from '@nestjs/common';
import { AdminLocationController } from '../../controllers/admin/location/admin-location.controller';
import { LocationService } from './location.service';

@Module({
    controllers: [
        AdminLocationController
    ],
    providers: [
        LocationService
    ],
    exports: [
        LocationService
    ],
})
export class LocationModule {
    //
}
