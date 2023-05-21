import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../../../guard/role.guard';
import { MBaseListPayload } from '../../../models/base/base-list-payload';
import { UserRegisterVM } from '../../../models/user/register/user-register.vm';
import { UserListPaginationVM, UserVM } from '../../../models/user/user';
import { UserManagementService } from '../../../services/user-management/user.management.service';

  @ApiBearerAuth()
  @Controller('admin/user')
  @ApiTags('Admin User')
  export class AdminUserManagementController {

    @Post('create')
    @ApiResponse({
        status: 200,
        description: 'Sucess create new user',
    })
    @UseGuards(RoleGuard('user.create'))
    async createUser(@Body() payload: UserRegisterVM): Promise<boolean> {
        const response = await UserManagementService.createAdminUser(payload);
        return response;
    }

    @Put(':id')
    @ApiResponse({
        status: 200,
        description: 'Sucess update user',
    })
    @UseGuards(RoleGuard('user.update'))
    async updateUser(@Param('id') id: string, @Body() payload: UserRegisterVM) {
        const response = await UserManagementService.update(id, payload);
        return response;
    }

    @Get('list')
    @UseGuards(RoleGuard('user.view'))
    @ApiOkResponse({ type: UserListPaginationVM })
    async getAdminUser(@Query() params: MBaseListPayload): Promise<UserListPaginationVM> {
      const response = await UserManagementService.findAllAdminUser(params);
      return response;
    }

    @Get(':id')
    @UseGuards(RoleGuard('user.view'))
    @ApiOkResponse({ type: UserVM })
    async getAdminUserById(@Param('id') id: string): Promise<UserVM> {
      const response = await UserManagementService.findById(id);
      return response;
    }

    @Delete(':id')
    @UseGuards(RoleGuard('user.delete'))
    @ApiOkResponse({ type: UserVM })
    async deleteAdminUser(@Param('id') id: string) {
      const response = await UserManagementService.delete(id);
      return response;
    }
  }