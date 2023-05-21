import { Module } from '@nestjs/common';
import { RoleController } from '../../controllers/admin/role-permission/role.controller';
import { RoleService } from './role.service';

@Module({
  controllers: [
    RoleController,
  ],
  providers: [
    RoleService,
  ],
  exports: [
    RoleService
  ],
})
export class RoleModule {
  //
}
