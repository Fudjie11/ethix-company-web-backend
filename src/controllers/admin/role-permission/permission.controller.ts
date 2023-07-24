import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MBaseListPayload } from '../../../models/base/base-list-payload';
import { PermissionListPaginationVM, PermissionVM } from '../../../models/role-permission/permission.vm';
import { PermissionService } from '../../../services/role-permission/permission.service';
import { RoleGuard } from '../../../guard/role.guard';

@Controller('admin/permission')
@ApiTags('Admin Permission')
@ApiBearerAuth()
  export class PermissionController {
    @Get('list')
    @ApiOkResponse({ type: PermissionListPaginationVM })
    @UseGuards(RoleGuard('role.view'))
    async getPermission(@Query() params: MBaseListPayload): Promise<PermissionListPaginationVM> {
      const response = await PermissionService.findAll(params);
      return response;
    }

    @Get(':id')
    @ApiOkResponse({ type: PermissionVM })
    @UseGuards(RoleGuard('role.view'))
    async getPermissionById(@Param('id') id: string): Promise<PermissionVM> {
      const response = await PermissionService.findById(id);
      return response;
    }
  }