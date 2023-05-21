import { Controller, Delete, Get, Param, Post, Res, UploadedFile, UseInterceptors  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileVM } from '../../../models/file/file.vm';
import { FileService } from '../../../services/file/file.service';

@ApiTags('Public - File')
// @ApiBearerAuth()
@Controller('public/file')
export class PublicFileController {
  @Post('upload-single')
  @UseInterceptors(FileInterceptor('upload'))
  async uploadFile (@UploadedFile() file: Express.Multer.File) {
    let url = '';
    let fileName = '';
    let _id = '';
    const uploaded = 1;
    await FileService.createAndUploadFileFromBuffer(file).then(res => {
      fileName = res.fileName;
      url = res.fileUrl;
      _id = res.id;
    });

    return {_id, fileName, url, uploaded};
  }

  @Delete('delete/:id')
  async deleteFile (@Param('id') id: string) {
    return await FileService.deleteFile(id);
  }

  @Get('upload_program/:name')
  getFile(@Param('name') name,@Res() res) {
    return res.sendFile(name,{root : './public/upload_program'});
  }
}
