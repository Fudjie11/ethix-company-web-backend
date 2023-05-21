import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ParseIntPipeWithDefaultValue } from '../../../shared/pipes/parse-int-with-default-value.pipe';
import { ArticleCategoryService } from '../../../services/article-category/article-category.service';
import { AppConfigListPaginationVM, AppConfigVM } from '../../../models/app-config/app-config.vm';
import { AppConfigEntryDto } from '../../../models/app-config/app-config.dto';
import { AppConfigService } from '../../../services/app-config/app-config.service';

@ApiTags('Admin - App Config')
// @ApiBearerAuth()
@Controller('admin/app-config')
export class AdminAppConfigController {
  @Get('list')
  @ApiOkResponse({ type: AppConfigListPaginationVM })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'keyword', required: false })
  async list(
    @Query('take', new ParseIntPipeWithDefaultValue(30)) take: number,
    @Query('skip', new ParseIntPipeWithDefaultValue(0)) skip: number,
    @Query('keyword') keyword: string
  ) {
    return ArticleCategoryService.findAll({ take, skip, keyword });
  }

  @Get(':id')
  @ApiOkResponse({ type: AppConfigVM })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  async load(@Param('id') appConfigId: Types.ObjectId) {
    return AppConfigService.findById(appConfigId);
  }

  @Post('create')
  @ApiOkResponse({ type: AppConfigVM })
  async create(@Body() payload: AppConfigEntryDto) {
    return AppConfigService.save(payload);
  }

  @Put(':id')
  @ApiOkResponse({ type: AppConfigVM })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  async update(@Param('id') appConfigId: Types.ObjectId, @Body() payload: AppConfigEntryDto) {
    return AppConfigService.update(appConfigId, payload);
  }
}
