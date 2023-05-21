import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ParseIntPipeWithDefaultValue } from '../../../shared/pipes/parse-int-with-default-value.pipe';
import { WarehouseService } from '../../../services/warehouse/warehouse.service';
import { WarehouseListPaginationVM, WarehouseVM } from '../../../models/warehouse/warehouse.vm';

@ApiTags('Public - Warehouse')
@Controller('public/warehouse')
export class PublicWarehouseController {
  @Get('list')
  @ApiOkResponse({ type: WarehouseListPaginationVM })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'keyword', required: false })
  @ApiQuery({ name: 'locationId', required: false })
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
  async load(@Param('id') warehouseId: Types.ObjectId) {
    return await WarehouseService.findById(warehouseId);
  }
}
