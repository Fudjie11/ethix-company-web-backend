import { Controller, Delete, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileVM } from '../../../models/file/file.vm';
import { FileService } from '../../../services/file/file.service';

@ApiTags('Admin - File')
// @ApiBearerAuth()
@Controller('admin/file')
export class AdminFileController {
  @Post('upload-single')
  @ApiOkResponse({ type: FileVM })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile (@UploadedFile() file: Express.Multer.File) {  
    return  FileService.createAndUploadFileFromBuffer(file)
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, type: 'string' })
  getFile(
    @Res() serverResponse: any,
    @Param('id') fileId: string,
  ) {
    return FileService.downloadFileAndStreamToClient(fileId, serverResponse);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', required: true, type: 'string' })
  async delete (@Param('id') fileId: string) {
    const success = await FileService.deleteFile(fileId)
    return {
      success
    }
  }
}
