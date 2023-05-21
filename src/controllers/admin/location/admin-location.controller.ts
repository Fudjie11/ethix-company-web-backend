import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { LocationEntryDto } from '../../../models/location/location.dto';
import { ParseIntPipeWithDefaultValue } from '../../../shared/pipes/parse-int-with-default-value.pipe';
import { LocationService } from '../../../services/location/location.service';
import { LocationEntryVM, LocationListPaginationVM, LocationVM } from '../../../models/location/location.vm';
import { RoleGuard } from '../../../guard/role.guard';

@ApiTags('Admin - Location')
@ApiBearerAuth()
@Controller('admin/location')
export class AdminLocationController {
  @Get('list')
  @ApiOkResponse({ type: LocationListPaginationVM })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'keyword', required: false })
  @UseGuards(RoleGuard('location.view'))
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
  @UseGuards(RoleGuard('location.view'))
  async load(@Param('id') locationId: Types.ObjectId) {
    return LocationService.findById(locationId);
  }

  @Post('create')
  @ApiOkResponse({ type: LocationEntryVM })
  @UseGuards(RoleGuard('location.create'))
  async create(@Body() payload: LocationEntryDto) {
    return LocationService.save(payload);
  }

  @Put(':id')
  @ApiOkResponse({ type: LocationEntryVM })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @UseGuards(RoleGuard('location.update'))
  async update(@Param('id') locationId: Types.ObjectId, @Body() payload: LocationEntryDto) {
    return LocationService.update(locationId, payload);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @UseGuards(RoleGuard('location.delete'))
  async delete(@Param('id') locationId: Types.ObjectId) {
    return LocationService.delete(locationId);
  }
}
