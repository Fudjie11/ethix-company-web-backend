import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DEFAULT_ROLE_ACCESS } from '../../../constants/acces-role';
import { RoleGuard } from '../../../guard/role.guard';
import { MBaseListPayload } from '../../../models/base/base-list-payload';
import { RoleEntryVM, RoleListPaginationVM, RoleVM } from '../../../models/role-permission/role.vm';
import { PermissionService } from '../../../services/role-permission/permission.service';
import { RoleService } from '../../../services/role-permission/role.service';

  @ApiBearerAuth()
  @Controller('admin/role')
  @ApiTags('Admin Role')
  export class RoleController {
    @Post('create')
    @ApiOkResponse({ type: RoleVM })
    @UseGuards(RoleGuard('role.create'))
    async createRole(@Body() payload: RoleEntryVM): Promise<RoleVM> {
      const response = await RoleService.create(payload);
      return response;
    }

    @Get('permission')
    @UseGuards(RoleGuard('role.view'))
    async getPermission() {
      const response = await PermissionService.findALlForRole();
      return response;
    }

    @Get('default-role-access')
    @UseGuards(RoleGuard('role.create'))
    async defaultRoleAccess() {
      return DEFAULT_ROLE_ACCESS;
    }

    @Get('list')
    @ApiOkResponse({ type: RoleListPaginationVM })
    @UseGuards(RoleGuard('role.view'))
    async getRole(@Query() params: MBaseListPayload): Promise<RoleListPaginationVM> {
      const response = await RoleService.findAll(params);
      return response;
    }

    @Get(':id')
    @ApiOkResponse({ type: RoleVM })
    @UseGuards(RoleGuard('role.view'))
    async getRoleById(@Param('id') id: string): Promise<RoleVM> {
      const response = await RoleService.findById(id);
      return response;
    }

    @Put(':id')
    @ApiOkResponse({ type: RoleVM })
    @UseGuards(RoleGuard('role.update'))
    async updateRole(@Param('id') id: string, @Body() payload: RoleEntryVM): Promise<RoleVM> {
      const response = await RoleService.update(id, payload);
      return response;
    }

    @Delete(':id')
    @ApiOkResponse({ type: RoleVM })
    @UseGuards(RoleGuard('role.delete'))
    async deleteRole(@Param('id') id: string) {
      const response = await RoleService.delete(id);
      return response;
    }
  }