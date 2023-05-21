import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ParseIntPipeWithDefaultValue } from '../../../shared/pipes/parse-int-with-default-value.pipe';
import { LocationService } from '../../../services/location/location.service';
import { LocationListPaginationVM, LocationVM } from '../../../models/location/location.vm';

@ApiTags('Public - Location')
@Controller('public/location')
export class PublicLocationController {
  @Get('list')
  @ApiOkResponse({ type: LocationListPaginationVM })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'keyword', required: false })
  async list(
    @Query('take', new ParseIntPipeWithDefaultValue(30)) take: number,
    @Query('skip', new ParseIntPipeWithDefaultValue(0)) skip: number,
    @Query('keyword') keyword: string
  ) {
    return LocationService.findAll({ take, skip, keyword });
  }

  @Get(':id')
  @ApiOkResponse({ type: LocationVM })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  async load(@Param('id') locationId: Types.ObjectId) {
    return LocationService.findById(locationId);
  }
}
