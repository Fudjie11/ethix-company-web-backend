import { NotFoundException } from '@nestjs/common';
import moment from 'moment';
import { RepositoryService } from '../../../libs/dh-db/src/service/repository/repository.service';
import { AwsS3Service } from './aws-s3.service';
import { writeFileSync } from 'fs';
import { FileDto } from 'src/models/file/file.dto';
import Jimp from 'jimp';

export class FileService {
  public static async createAndUploadFileFromBuffer(file: Express.Multer.File) {
    let buffer = file.buffer;

    const fileType = file.mimetype.split('/')
    let imageResized = false
    if (fileType[0] === 'image') {
      const image = await Jimp.read(file.buffer)
      if (image.bitmap.width > 630) {
        image.resize(630, Jimp.AUTO)
        buffer = await image.getBufferAsync(Jimp.MIME_PNG)
        imageResized = true
      }
    }

    if (!imageResized) {
      const imageOfflinePath = `upload_program/thumbnail-${new Date().getTime()}-${file.originalname}`;
      await writeFileSync(`public/${imageOfflinePath}`, file.buffer);
    }

    const createdFile = await RepositoryService.file.create({
      fileName: file.originalname,
      fileMime: file.mimetype
    });

    await AwsS3Service.uploadFileBuffer(
      buffer,
      file.originalname,
      file.mimetype,
      createdFile._id.toString()
    );

    const url = process.env.APP_URL

    const key = `attachments/${moment(new Date()).format('Y/M/D')}/${createdFile._id}/${createdFile.fileName}`;
    const bucketName = 'ruang-insan-berbagi';
    await RepositoryService.file.update(createdFile._id, { fileUrl: `https://${bucketName}.s3.amazonaws.com/${key}`, fileKey: key });
    // await RepositoryService.file.update(createdFile._id, { fileUrl: `${url}/public/file/${imageOfflinePath}`, fileKey: key });
    const newFile = await RepositoryService.file.findByObjectId(createdFile._id);

    return newFile;
  }

  public static async downloadFileAndStreamToClient(fileId: string, response: any) {
    const file = await RepositoryService.file.findByObjectId(fileId);

    if (file) {
      const key = `attachments/${moment(file.createdAt).format('Y/M/D')}/${file._id}/${file.fileName}`;
      return AwsS3Service.downloadFileAndStreamToClient(
        response,
        key,
        file.fileName,
        file.fileMime,
      );
    } else {
      throw new NotFoundException('File not found');
    }
  }

  public static async deleteFile(fileId: string) {
    const attachment = await RepositoryService.file.findByObjectId(fileId)
    if (attachment) {
      await AwsS3Service.deleteFile(attachment.fileKey || fileId);
      await attachment.remove()
      return true
    }

    return false;
  }

  public static async getById(fileId : string) : Promise<FileDto>{
    const file = await RepositoryService.file.findByObjectId(fileId)

    return file
  }
}
