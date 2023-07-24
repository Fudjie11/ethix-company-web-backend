import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { TagEntryDto } from '../../../models/tag/tag.dto';
import { ParseIntPipeWithDefaultValue } from '../../../shared/pipes/parse-int-with-default-value.pipe';
import { TagService } from '../../../services/tag/tag.service';
import { TagListPaginationVM, TagVM, TagEntryVM } from '../../../models/tag/tag.vm';
import { RoleGuard } from '../../../guard/role.guard';

@ApiTags('Admin - Tag')
@ApiBearerAuth()
@Controller('admin/tag')
export class AdminTagController {
  @Get('list')
  @ApiOkResponse({ type: TagListPaginationVM })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'keyword', required: false })
  @UseGuards(RoleGuard('tag.view'))
  async list(
    @Query('take', new ParseIntPipeWithDefaultValue(30)) take: number,
    @Query('skip', new ParseIntPipeWithDefaultValue(0)) skip: number,
    @Query('keyword') keyword: string
  ) {
    return TagService.findAll({ take, skip, keyword });
  }

  @Get(':id')
  @ApiOkResponse({ type: TagVM })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @UseGuards(RoleGuard('tag.view'))
  async load(@Param('id') tagId: Types.ObjectId) {
    return TagService.findById(tagId);
  }

  @Post('create')
  @ApiOkResponse({ type: TagEntryVM })
  @UseGuards(RoleGuard('tag.create'))
  async create(@Body() payload: TagEntryDto) {
    return TagService.save(payload);
  }

  @Put(':id')
  @ApiOkResponse({ type: TagVM })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @UseGuards(RoleGuard('tag.update'))
  async update(@Param('id') tagId: Types.ObjectId, @Body() payload: TagEntryDto) {
    return TagService.update(tagId, payload);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @UseGuards(RoleGuard('tag.delete'))
  async delete(@Param('id') tagId: Types.ObjectId) {
    return TagService.delete(tagId);
  }
}
