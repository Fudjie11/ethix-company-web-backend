import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { WarehouseEntryDto } from '../../../models/warehouse/warehouse.dto';
import { ParseIntPipeWithDefaultValue } from '../../../shared/pipes/parse-int-with-default-value.pipe';
import { WarehouseService } from '../../../services/warehouse/warehouse.service';
import { WarehouseListPaginationVM, WarehouseVM, WarehouseEntryVM } from '../../../models/warehouse/warehouse.vm';
import { RoleGuard } from '../../../guard/role.guard';

@ApiTags('Admin - Warehouse')
@ApiBearerAuth()
@Controller('admin/warehouse')
export class AdminWarehouseController {
  @Get('list')
  @ApiOkResponse({ type: WarehouseListPaginationVM })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'keyword', required: false })
  @ApiQuery({ name: 'locationId', required: false })
  @UseGuards(RoleGuard('warehouse.view'))
  async list(
    @Query('take', new ParseIntPipeWithDefaultValue(30)) take: number,
    @Query('skip', new ParseIntPipeWithDefaultValue(0)) skip: number,
    @Query('locationId') locationId: string,
    @Query('sort') sort: any,
    @Query('keyword') keyword: string
  ) {
    return await WarehouseService.findAll({ take, skip, keyword, sort }, { locationId });
  }

  @Get(':id')
  @ApiOkResponse({ type: WarehouseVM })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @UseGuards(RoleGuard('warehouse.view'))
  async load(@Param('id') warehouseId: Types.ObjectId) {
    return await WarehouseService.findById(warehouseId);
  }

  @Post('create')
  @ApiOkResponse({ type: WarehouseEntryVM })
  @UseGuards(RoleGuard('warehouse.create'))
  async create(@Body() warehouseToCreate: WarehouseEntryDto) {
    return await WarehouseService.save(warehouseToCreate);
  }

  @Put(':id')
  @ApiOkResponse({ type: WarehouseEntryVM })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @UseGuards(RoleGuard('warehouse.update'))
  async update(@Param('id') warehouseId: Types.ObjectId, @Body() warehouseToUpdate: WarehouseEntryDto) {
    return await WarehouseService.update(warehouseId, warehouseToUpdate);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @UseGuards(RoleGuard('warehouse.delete'))
  async delete(@Param('id') warehouseId: Types.ObjectId) {
    return await WarehouseService.delete(warehouseId);
  }
}
