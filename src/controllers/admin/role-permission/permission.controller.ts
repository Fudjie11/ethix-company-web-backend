import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../../../guard/role.guard';
import { MBaseListPayload } from '../../../models/base/base-list-payload';
import { PermissionListPaginationVM, PermissionVM } from '../../../models/role-permission/permission.vm';
import { PermissionService } from '../../../services/role-permission/permission.service';

  @ApiBearerAuth()
  @Controller('admin/permission')
  @ApiTags('Admin Permission')
  export class PermissionController {
    @Get('list')
    @UseGuards(RoleGuard('permission.view'))
    @ApiOkResponse({ type: PermissionListPaginationVM })
    async getPermission(@Query() params: MBaseListPayload): Promise<PermissionListPaginationVM> {
      const response = await PermissionService.findAll(params);
      return response;
    }

    @Get(':id')
    @UseGuards(RoleGuard('permission.view'))
    @ApiOkResponse({ type: PermissionVM })
    async getPermissionById(@Param('id') id: string): Promise<PermissionVM> {
      const response = await PermissionService.findById(id);
      return response;
    }
  }